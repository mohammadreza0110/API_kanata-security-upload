const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("./user.model");
const { UserMessage } = require("./user.messages");

const dotenv = require("dotenv");
dotenv.config();

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }

  async getAllUsers(page, limit) {
    const skip = (page - 1) * limit; // محاسبه تعداد کاربرانی که باید رد شوند

    // تعداد کل کاربران
    const totalUsers = await this.#model.countDocuments().exec();

    // دریافت کاربران با پیچ نیشن و حذف فیلدهای خاص
    const data = await this.#model
      .find()
      .skip(skip) // تعداد کاربران که باید رد شوند
      .limit(limit) // تعداد کاربران که باید برگردانده شوند
      .select("-verifyOTP -password -__v")
      .exec();

    // محاسبه تعداد کل صفحات
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      data,
      totalUsers,
      totalPages,
    };
  }

  async changeProfile(userId, fullName, fullNameEnglish, biography, email) {
    try {
      // پیدا کردن کاربر با استفاده از userId
      const user = await this.#model.findOne({ _id: userId });
      if (!user) {
        throw new createHttpError.NotFound(UserMessage.NotFound);
      }

      // بررسی پر بودن مقادیر fullName، fullNameEnglish، biography و email
      if (
        !fullName?.trim() ||
        !fullNameEnglish?.trim() ||
        !biography?.trim() ||
        !email?.trim()
      ) {
        throw new createHttpError.BadRequest(UserMessage.NotEmpty);
      }

      // اعمال تغییرات به پروفایل کاربر
      user.fullName = fullName;
      user.fullNameEnglish = fullNameEnglish;
      user.biography = biography;
      user.email = email;

      // ذخیره کردن تغییرات
      await user.save();

      return {
        _id: user._id,
        fullName: user.fullName,
        fullNameEnglish: user.fullNameEnglish,
        email: user.email,
        biography: user.biography,
      };
    } catch (error) {
      console.error("Error in changeProfile:", error.message);
      throw error;
    }
  }

  async editUser(userId, updatedData) {
    try {
      if (!userId || !updatedData) {
        throw new createHttpError.BadRequest(
          "شناسه کاربر یا داده‌های ویرایش غایب است"
        );
      }

      const user = await this.#model.findById(userId);
      if (!user) {
        throw new createHttpError.NotFound("کاربر یافت نشد");
      }

      // به‌روزرسانی اطلاعات کاربر فقط در صورتی که فیلد تغییر کرده باشد
      const fieldsToUpdate = [
        "fullName",
        "fullNameEnglish",
        "email",
        "role",
        "biography",
      ];
      fieldsToUpdate.forEach((field) => {
        if (updatedData[field] && updatedData[field] !== user[field]) {
          user[field] = updatedData[field];
        }
      });

      await user.save();
      return user;
    } catch (error) {
      throw new createHttpError.InternalServerError("خطا در ویرایش کاربر");
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await this.#model.findByIdAndDelete(userId).lean();

      if (!deletedUser) {
        throw new Error("کاربر پیدا نشد");
      }

      return deletedUser;
    } catch (error) {
      throw new Error("خطا در حذف کاربر: " + error.message);
    }
  }

  async uploadProfilePicture(userId, profilePicturePath) {
    const user = await this.#model.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicturePath },
      { new: true, lean: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    try {
      // پیدا کردن کاربر با استفاده از ID
      const user = await this.#model.findById(userId);

      if (!user) {
        throw new createHttpError.NotFound("کاربر پیدا نشد");
      }

      // مقایسه رمز عبور قدیمی با رمز عبور ذخیره شده
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw new createHttpError.Unauthorized("رمز عبور قدیمی نادرست است");
      }

      // بررسی اینکه پسورد جدید با پسورد فعلی یکسان نباشد
      const isSamePassword = await bcrypt.compare(newPassword, user.password);

      if (isSamePassword) {
        throw new createHttpError.BadRequest(
          "پسورد جدید با پسورد قبلی یکسان است"
        );
      }

      // رمزگذاری رمز عبور جدید
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // بروزرسانی رمز عبور
      user.password = hashedPassword;
      await user.save();

      return {
        message: "رمز عبور با موفقیت تغییر کرد",
      };
    } catch (error) {
      console.error("Error in changePassword:", error.message);
      throw error;
    }
  }

  async createUser({ fullName, phone, email, password, role }) {
    try {
      // بررسی اینکه ایمیل یا تلفن قبلاً استفاده نشده باشد
      const existingUser = await this.#model.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        throw new createHttpError.Conflict("ایمیل یا تلفن قبلاً ثبت شده است");
      }

      // رمزگذاری رمز عبور
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // ایجاد کاربر جدید
      const newUser = await this.#model.create({
        fullName,
        phone,
        email,
        password: hashedPassword,
        role,
      });

      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error.message);
      throw error;
    }
  }
}

module.exports = new UserService();
