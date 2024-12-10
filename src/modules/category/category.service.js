const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const { CategoryMessages } = require("./category.massage");
const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");
class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async find() {
    return await this.#model.find({ parent: { $exists: false } });
  }

  async findByLanguage(language) {
    return await this.#model.aggregate([
      { $unwind: "$localizedContent" }, // باز کردن آرایه localizedContent
      { $match: { "localizedContent.language": language } }, // فیلتر کردن بر اساس زبان
      { $project: { localizedContent: 1, parent: 1, parents: 1 } }, // فقط فیلدهای مورد نیاز
    ]);
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto?.parent)) {
      const existCategory = await this.checkExistsById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }

    if (Array.isArray(categoryDto?.localizedContent)) {
      categoryDto.localizedContent.forEach((content) => {
        if (!content.slug) {
          content.slug = slugify(content.name, { lower: true });
        }
      });
    } else {
      throw new Error("محتوای محلی باید یک آرایه باشد");
    }

    const category = await this.#model.create(categoryDto);
    return category;
  }


  async update(id, updateDto) {
    // بررسی وجود دسته‌بندی با ID مشخص شده
    const category = await this.checkExistsById(id);

    // بررسی و به‌روزرسانی فیلد parent در صورت وجود
    if (updateDto?.parent && updateDto.parent !== "") {
      if (!isValidObjectId(updateDto.parent)) {
        throw new createHttpError.BadRequest("شناسه والد نامعتبر است");
      }

      const existCategory = await this.checkExistsById(updateDto.parent);
      updateDto.parent = existCategory._id;
      updateDto.parents = [
        ...new Set(
            [existCategory._id.toString()]
                .concat(existCategory.parents.map((id) => id.toString()))
                .map((id) => new Types.ObjectId(id))
        ),
      ];
    } else {
      delete updateDto.parent; // حذف parent اگر خالی باشد
    }

    // به‌روزرسانی محتواهای محلی (localizedContent)
    if (Array.isArray(updateDto?.localizedContent)) {
      updateDto.localizedContent.forEach((content) => {
        if (!content.slug) {
          content.slug = slugify(content.name, { lower: true });
        }
      });
    } else {
      throw new createHttpError.BadRequest("محتوای محلی باید یک آرایه باشد");
    }

    // انجام به‌روزرسانی در پایگاه‌داده
    const updatedCategory = await this.#model.findByIdAndUpdate(id, updateDto, {
      new: true, // برگرداندن نسخه به‌روزشده
      runValidators: true, // اجرای اعتبارسنجی‌ها
    });

    return updatedCategory;
  }


  async delete(id) {
    if (!isValidObjectId(id)) {
      throw new createHttpError.BadRequest("شناسه دسته‌بندی نامعتبر است");
    }

    const category = await this.checkExistsById(id);

    // بررسی اینکه دسته‌بندی والد دارد یا خیر
    if (category.children && category.children.length > 0) {
      throw new createHttpError.Conflict("نمی‌توان دسته‌بندی را حذف کرد زیرا شامل زیرشاخه‌هایی است");
    }

    await this.#model.findByIdAndDelete(id);
    return { message: CategoryMessages.DeleteSuccess };
  }
  // Helper functions
  async checkExistsById(id) {
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(CategoryMessages.NotFound);
    return category;
  }
  async checkExistsBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category)
      throw new createHttpError.NotFound(CategoryMessages.NotFound);
    return category;
  }
  async alreadyExistsBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(CategoryMessages.CategoryExist);
    return category;
  }
}
module.exports = new CategoryService();
