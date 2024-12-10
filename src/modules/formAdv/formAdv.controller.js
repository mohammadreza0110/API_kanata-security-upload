const dotenv = require("dotenv");
const formAdvService = require("./formAdv.service");
const autoBind = require("auto-bind");
const {
  editUserSchema,
  changeProfileSchema,
} = require("../../common/middleware/joi/validation.user");
const HttpCodes = require("http-codes");

dotenv.config();

class formAdvController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = formAdvService;
  }

  async getFormById(req, res) {
    try {
      const formId = req.params.id;
      const form = await this.#service.getFormById(formId);
      if (!form) {
        return res.status(404).json({ message: "فرم پیدا نشد" });
      }
      res.status(200).json(form);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت فرم", error });
    }
  }

  // دریافت همه فرم‌ها با صفحه‌بندی
  async getAllForms(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // صفحه فعلی
      const limit = parseInt(req.query.limit) || 10; // تعداد فرم‌ها در هر صفحه

      const formsData = await this.#service.getAllForms(page, limit);
      res.status(200).json(formsData);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت فرم‌ها", error });
    }
  }

  // ارسال یک فرم جدید
  async submitForm(req, res) {
    try {
      const formData = req.body;
      const createdForm = await this.#service.createForm(formData);
      res.status(201).json({ message: "فرم با موفقیت ارسال شد", createdForm });
    } catch (error) {
      res.status(500).json({ message: "خطا در ارسال فرم", error: error.message });
    }
  }



  // به‌روزرسانی یک فرم با شناسه
  async updateFormById(req, res) {
    try {
      const formId = req.params.id;
      const updatedData = req.body;
      const updatedForm = await this.#service.updateForm(formId, updatedData);
      if (!updatedForm) {
        return res.status(404).json({ message: "فرم پیدا نشد" });
      }
      res.status(200).json({ message: "فرم با موفقیت به‌روزرسانی شد", updatedForm });
    } catch (error) {
      res.status(500).json({ message: "خطا در به‌روزرسانی فرم", error });
    }
  }

  // حذف یک فرم با شناسه
  async deleteFormById(req, res) {
    try {
      const formId = req.params.id;
      const deletedForm = await this.#service.deleteForm(formId);
      if (!deletedForm) {
        return res.status(404).json({ message: "فرم پیدا نشد" });
      }
      res.status(200).json({ message: "فرم با موفقیت حذف شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در حذف فرم", error });
    }
  }
}

module.exports = new formAdvController();
