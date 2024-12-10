const autoBind = require("auto-bind");
const FormService = require("./form.service");
const { formSchema } = require("../../common/middleware/joi/validation.form");
const HttpCodes = require("http-codes");

class FormController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = FormService;
  }

  async sendMsg(req, res, next) {
    try {
      const { error } = formSchema.validate(req.body);
      if (error) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { fullName, phone, email, issue, msg } = req.body;
      await this.#service.sendMsg(fullName, phone, email, issue, msg);

      res.status(HttpCodes.OK).json({
        message: "پیام با موفقیت ذخیره شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async showMsg(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1; // صفحه جاری (پیش‌فرض: 1)
      const limit = parseInt(req.query.limit, 10) || 10; // تعداد پیام‌ها در هر صفحه (پیش‌فرض: 10)

      const { data, totalMessages, totalPages } =
        await this.#service.getAllMessages(page, limit);

      res.status(HttpCodes.OK).json({
        data: {
          messages: data, // پیام‌های صفحه جاری
          totalMessages, // تعداد کل پیام‌ها
          totalPages, // تعداد کل صفحات
          currentPage: page, // صفحه جاری
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getShow(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(createHttpError.BadRequest("لطفاً id را وارد کنید"));
      }

      const showIndex = await this.#service.getOneMessage(id);

      if (!showIndex) {
        return next(createHttpError.NotFound("پیام مورد نظر پیدا نشد"));
      }

      res.status(200).json({
        data: showIndex,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMsg(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          message: "لطفاً id را وارد کنید",
        });
      }

      const deletedMsg = await this.#service.deleteMessage(id);

      res.status(HttpCodes.OK).json({
        message: `پیام با موضوع "${deletedMsg.issue}" از ${deletedMsg.fullName} با موفقیت حذف شد.`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FormController();
