// auth.service.js

const Kavenegar = require("kavenegar");
const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthMessage } = require("./auth.messages");
const { randomInt } = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
class AuthService {
  #model;
  #kavenegarApi;

  constructor() {
    autoBind(this);
    this.#model = UserModel;
    this.#kavenegarApi = Kavenegar.KavenegarApi({
      apikey: process.env.API_KEY_KAVENEGAE, // استفاده از API_KEY از فایل .env
    });
  }

  async loginUser(identifier, password) {
    // جستجوی کاربر بر اساس تلفن یا ایمیل
    let user = await this.#model.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    });

    // اگر کاربر وجود نداشت، خطای Unauthorized برگردانده شود
    if (!user) {
      throw new createHttpError.Unauthorized(AuthMessage.NotFound);
    }

    // بررسی صحت پسورد
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new createHttpError.Unauthorized(AuthMessage.PasswordFailed);
    }

    // ایجاد توکن دسترسی
    const accessToken = this.signToken({
      phone: user.phone,
      email: user.email,
      id: user._id,
      role: user.role,
    });

    // برگرداندن توکن و نقش کاربر
    return { accessToken, role: user.role };
  }

  async registerUser(identifier, password, fullName) {
    // بررسی وجود کاربر با تلفن یا ایمیل مشخص شده
    let user = await this.#model.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    });

    // اگر کاربر وجود داشته باشد، خطای Conflict برگردانده شود
    if (user) {
      throw new createHttpError.Conflict(AuthMessage.UserAlreadyExists);
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر جدید
    user = await this.#model.create({
      phone: identifier.includes("@") ? undefined : identifier,
      email: identifier.includes("@") ? identifier : undefined,
      password: hashedPassword,
      fullName,
    });

    // ایجاد توکن دسترسی
    const accessToken = this.signToken({
      phone: user.phone,
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return { accessToken };
  }

  async sendOTPCode(phone) {
    let user = await this.#model.findOne({ phone });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);

    const now = new Date().getTime();
    const verifyOTP = {
      code: randomInt(100000, 999999).toString(), // تبدیل کد به رشته
      expiresIn: now + 1000 * 60 * 2, // اعتبار دو دقیقه
    };

    // OTP را در دیتابیس ذخیره کنید
    user.verifyOTP = verifyOTP;
    await user.save();

    // ارسال کد OTP از طریق الگو پترن کاوه نگار
    try {
      await new Promise((resolve, reject) => {
        this.#kavenegarApi.VerifyLookup(
          {
            receptor: phone, // شماره دریافت‌کننده (کاربر)
            token: verifyOTP.code, // کد OTP
            template: "verifyOTP", // نام الگو در کاوه نگار
          },
          function (response, status) {
            if (status !== 200) {
              console.error("Kavenegar API Error:", response);
              reject(new Error(`خطا در ارسال پیامک: ${status}, ${response}`));
            } else {
              resolve(response);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error in sendOTPCode:", error.message);
      throw new Error("خطا در ارسال پیامک");
    }

    return user;
  }

  async verifyOTPCode(phone, code) {
    const user = await this.checkExistsByPhone(phone);
    const now = new Date().getTime();

    if (user?.verifyOTP?.expiresIn < now) {
      throw new createHttpError.Unauthorized(AuthMessage.OTPExpired);
    }
    if (user?.verifyOTP?.code !== code) {
      throw new createHttpError.Unauthorized(AuthMessage.OTPIsIncorrect);
    }

    if (!user?.verifyOTPToken) {
      user.verifyOTPToken = true;
      await user.save();
    }

    const accessToken = this.signToken({
      phone,
      id: user._id,
      role: user.role,
    });
    return accessToken;
  }

  async updateUserPassword(phone, newPassword) {
    let user = await this.#model.findOne({ phone });

    if (!user) {
      throw new createHttpError.NotFound(AuthMessage.NotFound);
    }

    // هش کردن پسورد جدید
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // به‌روزرسانی پسورد در دیتابیس
    user.password = hashedPassword;

    await user.save();

    return user;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  async checkExistsByPhone(phone) {
    try {
      const user = await this.#model.findOne({ phone });
      if (!user) {
        throw new createHttpError.NotFound(AuthMessage.NotFound);
      }
      return user;
    } catch (error) {
      console.error("Error checking user by phone:", error);
      throw error;
    }
  }
}

module.exports = new AuthService();
