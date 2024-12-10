const dotenv = require("dotenv");
const userService = require("./user.service");
const autoBind = require("auto-bind");
const path = require("path");
const { UserMessage } = require("./user.messages");
const {
  editUserSchema,
  changeProfileSchema,
} = require("../../common/middleware/joi/validation.user");
const HttpCodes = require("http-codes");

const WeblogModel = require("../weblog/weblog.model");

dotenv.config();

class UserController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async getNumberUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1; // صفحه جاری (پیش‌فرض: 1)
      const limit = parseInt(req.query.limit, 10) || 10; // تعداد کاربران در هر صفحه (پیش‌فرض: 10)

      const { data, totalUsers, totalPages } = await this.#service.getAllUsers(
        page,
        limit
      );

      return res.json({
        data: {
          users: data, // کاربران صفحه جاری
          totalUsers, // تعداد کل کاربران
          totalPages, // تعداد کل صفحات
          currentPage: page, // صفحه جاری
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async whoami(req, res, next) {
    try {
      const user = req.user;
      console.log("user", user);

      // شمارش تعداد وبلاگ‌هایی که کاربر لاگین‌شده مالک آن‌ها است
      const blogCount = await WeblogModel.countDocuments({ owner: user._id });

      res.json({
        user,
        blogCount, // تعداد وبلاگ‌های کاربر را اضافه کنید
      });
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      const userId = req.params.id;

      // اعتبارسنجی داده‌های ورودی
      const { error } = editUserSchema.validate(req.body, {
        allowUnknown: false,
      });
      if (error) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const { fullName, fullNameEnglish, email, role, biography } = req.body;

      if (!userId) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          message: "شناسه کاربر الزامی است",
        });
      }

      const updatedUser = await this.#service.editUser(userId, {
        fullName,
        fullNameEnglish, // اضافه کردن فیلد fullNameEnglish
        email,
        role,
        biography,
      });

      if (!updatedUser) {
        return res.status(HttpCodes.NOT_FOUND).json({
          message: "کاربر پیدا نشد",
        });
      }

      res.status(HttpCodes.OK).json({
        message: "اطلاعات کاربر با موفقیت ویرایش شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;

      await this.#service.deleteUser(userId);

      res.status(HttpCodes.OK).json({
        message: "کاربر با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async changeProfile(req, res, next) {
    try {
      const { error } = changeProfileSchema.validate(req.body);
      if (error) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const { fullName, fullNameEnglish, biography, email } = req.body;

      // دسترسی به اطلاعات کاربر از طریق req.user
      if (!req.user || !req.user._id) {
        throw new createHttpError.Unauthorized("User not authenticated");
      }

      const updatedUser = await this.#service.changeProfile(
        req.user._id,
        fullName,
        fullNameEnglish,
        biography,
        email
      );

      return res.json({
        message: UserMessage.ChangeProfileSuccess,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadProfile(req, res, next) {
    try {
      console.log(req.body); // نمایش فیلدهای متنی
      console.log(req.file); // نمایش اطلاعات فایل

      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // فقط نام فایل را نگه می‌داریم
      const profilePictureName = path.basename(file.path); // خروجی: 1727546708665_pro.jpg

      // ایجاد مسیر نسبی
      const profilePicturePath = `uploads/img/${profilePictureName}`;

      const user = await this.#service.uploadProfilePicture(
        id,
        profilePicturePath
      );

      return res.status(200).json({
        message: "Profile picture updated successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          message: "لطفاً رمز عبور قدیمی و جدید را وارد کنید",
        });
      }

      const userId = req.user._id; // فرض می‌کنیم توکن کاربر در req.user قرار داده شده است

      // استفاده از سرویس برای تغییر رمز عبور
      const result = await this.#service.changePassword(
        userId,
        oldPassword,
        newPassword
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { fullName, phone, email, password, role } = req.body;

      // بررسی پر بودن فیلدها
      if (!fullName || (!phone && !email) || !password || !role) {
        return res.status(400).json({
          message: "لطفاً تمام فیلدهای لازم را وارد کنید",
        });
      }

      // بررسی نقش وارد شده توسط ادمین
      const validRoles = ["user", "admin", "superAdmin"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          message: "نقش وارد شده معتبر نیست",
        });
      }

      // استفاده از سرویس برای ایجاد کاربر جدید
      const result = await this.#service.createUser({
        fullName,
        phone,
        email,
        password,
        role,
      });

      return res.status(201).json({
        message: "کاربر جدید با موفقیت ثبت شد",
        user: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
