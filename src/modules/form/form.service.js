const autoBind = require("auto-bind");
const FormModel = require("./form.model");
const { log } = require("winston");
class FormService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = FormModel;
  }
  async sendMsg(fullName, phone, email, issue, msg) {
    try {
      const newMessage = new this.#model({
        fullName,
        phone,
        email,
        issue,
        msg,
      });
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error("خطا در ذخیره پیام: " + error.message);
    }
  }

  async getAllMessages(page, limit) {
    const skip = (page - 1) * limit; // محاسبه تعداد پیام‌هایی که باید رد شوند

    // تعداد کل پیام‌ها
    const totalMessages = await this.#model.countDocuments().exec();

    // دریافت پیام‌ها با پیچ نیشن
    const data = await this.#model
      .find()
      .skip(skip) // تعداد پیام‌هایی که باید رد شوند
      .limit(limit) // تعداد پیام‌هایی که باید برگردانده شوند
      .select("-updatedAt -__v")
      .exec();

    // محاسبه تعداد کل صفحات
    const totalPages = Math.ceil(totalMessages / limit);

    return {
      data,
      totalMessages,
      totalPages,
    };
  }

  async getOneMessage(id) {
    const msg = await this.#model.findById(id).select("-updatedAt -__v");
    return msg;
  }

  async deleteMessage(id) {
    try {
      const deletedMessage = await this.#model.findByIdAndDelete(id);
      if (!deletedMessage) {
        throw new Error("پیام مورد نظر پیدا نشد");
      }
      return deletedMessage;
    } catch (error) {
      throw new Error("خطا در حذف پیام: " + error.message);
    }
  }
}

module.exports = new FormService();
