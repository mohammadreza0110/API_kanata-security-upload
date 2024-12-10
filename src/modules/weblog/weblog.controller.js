const autoBind = require("auto-bind");
const WeblogService = require("./weblog.service");
const HttpCodes = require("http-codes");
const {
  createWeblogSchema,
  updateWeblogSchema,
  addCommentSchema,
  answerCommentSchema,
} = require("../../common/middleware/joi/validation.weblog");

class WeblogController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = WeblogService;
  }

  async find(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1; // صفحه جاری (پیش‌فرض: 1)
      const limit = parseInt(req.query.limit, 10) || 10; // تعداد آیتم‌ها در هر صفحه (پیش‌فرض: 10)

      const { data, totalItems, totalPages } =
        await this.#service.getAllWeblogs(page, limit);

      return res.json({
        data,
        totalItems,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLanguage(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1; // صفحه جاری (پیش‌فرض: 1)
      const limit = parseInt(req.query.limit, 10) || 10; // تعداد آیتم‌ها در هر صفحه (پیش‌فرض: 10)
      const language = req.query.language || "fa"; // زبان پیش‌فرض فارسی است
      const search = req.query.search || ""; // متن جستجو

      const { data, totalItems, totalPages } =
          await this.#service.getWeblogsByLanguage(language, page, limit, search);

      return res.json({
        data,
        totalItems,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const weblog = await this.#service.getOneWeblogs(id);
      return res.status(HttpCodes.OK).json({
        data: weblog,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // ابتدا محتوای محلی‌شده را پردازش کنید
      let { category, localizedContent, ...weblogData } = req.body;

      // اضافه کردن شناسه کاربر به هر محتوای محلی‌شده
      if (localizedContent) {
        localizedContent = localizedContent.map((content) => ({
          ...content,
          owner: req.user._id, // اضافه کردن شناسه کاربر به owner
        }));
      }

      // ایجاد وبلاگ جدید بدون اعتبارسنجی `localizedContent`
      const newWeblog = await this.#service.createWeblog({
        ...weblogData,
        localizedContent, // اضافه کردن `localizedContent` به داده‌های وبلاگ
        category: category,
      });

      return res.status(HttpCodes.CREATED).json({
        message: "وبلاگ با موفقیت ساخته شد",
        data: newWeblog,
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadBlogImage(req, res, next) {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imagePath = `/uploads/img/${file.filename}`;

      const updatedBlog = await this.#service.updateBlogImage(id, imagePath);

      return res.status(200).json({
        message: "Image uploaded successfully",
        data: updatedBlog,
      });
    } catch (error) {
      if (error.message === "Weblog not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async updateWeblog(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // ارسال categoryId به سرویس برای به‌روزرسانی
      const updatedWeblog = await this.#service.updateWeblog(id, updateData);

      return res.status(HttpCodes.OK).json({
        data: updatedWeblog,
        message: "وبلاگ با موفقیت ویرایش شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWeblog(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.deleteWeblog(id);
      return res.status(HttpCodes.OK).json({
        message: "وبلاگ با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async changeLanguage(req, res, next) {
    try {
      const { id } = req.params;
      const { language } = req.query;

      const weblog = await this.#service.changeLanguage(id, language);

      return res.status(HttpCodes.OK).json({
        data: weblog,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByViews(req, res, next) {
    try {
      const weblogs = await this.#service.getAllWeblogsSortedByViews();
      return res.json({
        data: weblogs,
      });
    } catch (error) {
      next(error);
    }
  }

// کنترلر برای جستجو
  async search(req, res, next) {
    try {
      const searchTerm = req.query.q; // عبارت جستجو از query
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      // فراخوانی تابع جستجو از سرویس
      const result = await this.#service.searchWeblogs(searchTerm, page, limit);

      return res.json({
        data: result.data,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        currentPage: page,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new WeblogController();