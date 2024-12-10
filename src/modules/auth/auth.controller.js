const dotenv = require("dotenv");
const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");

const {
  loginSchema,
  registerSchema,
  sendOTPSchema,
  verifyOTPSchema,
  changePasswordSchema,
} = require("../../common/middleware/joi/validation.auth");

dotenv.config();

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async loginUser(req, res, next) {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { identifier, password } = value; // `identifier` می‌تواند تلفن یا ایمیل باشد
    try {
      const { accessToken, role } = await this.#service.loginUser(
        identifier,
        password
      );
      return res.json({
        message: AuthMessage.LoginSuccess,
        token: accessToken,
        role: role, // اضافه کردن نقش کاربر به پاسخ
      });
    } catch (error) {
      return next(error);
    }
  }

  async register(req, res, next) {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { identifier, password, fullName } = value;

    try {
      const result = await this.#service.registerUser(
        identifier,
        password,
        fullName
      );
      res.status(201).json({
        message: "ثبت نام با موفقیت انجام شد",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    const { error, value } = sendOTPSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        details: error.details.map((detail) => detail.message),
      });
    }

    const { phone } = value;
    try {
      // ارسال کد تأیید
      await this.#service.sendOTPCode(phone);
      if (!res.headersSent) {
        return res.json({
          message: "کد تایید به شماره تلفن ارسال شد.",
        });
      }
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      if (!res.headersSent) {
        return res.status(500).json({
          message: "خطای سرور",
        });
      }
      next(error);
    }
  }

  async verifyOTPCode(req, res, next) {
    const { error, value } = verifyOTPSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        details: error.details.map((detail) => detail.message),
      });
    }

    try {
      const { phone, code } = value;
      await this.#service.verifyOTPCode(phone, code);

      return res.json({
        message: AuthMessage.VerifyCodeOTP,
      });
    } catch (error) {
      next(error);
    }
  }

  async ChangePassword(req, res, next) {
    const { error, value } = changePasswordSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        details: error.details.map((detail) => detail.message),
      });
    }

    const { phone, newPassword } = value;

    try {
      // به‌روزرسانی پسورد جدید
      await this.#service.updateUserPassword(phone, newPassword);

      return res.json({
        message: AuthMessage.ChangePasswordSuccessfuly,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
