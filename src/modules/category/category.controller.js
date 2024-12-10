const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { CategoryMessages } = require("./category.massage");
const {
  categorySchema,
} = require("../../common/middleware/joi/validation.category");
const HttpCodes = require("http-codes");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async create(req, res, next) {
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const { name, parent, slug, localizedContent } = req.body;

      // بررسی اینکه localizedContent یک آرایه باشد
      if (!Array.isArray(localizedContent)) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: "محتوای محلی باید یک آرایه باشد" });
      }

      const categoryData = { slug, localizedContent };

      if (parent) {
        categoryData.parent = parent;
      }

      await this.#service.create(categoryData);
      return res.status(HttpCodes.CREATED).json({
        message: CategoryMessages.CreateSuccess,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  // در CategoryController
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.delete(id);
      return res.status(HttpCodes.OK).json({
        message: CategoryMessages.DeleteSuccess,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        return res
            .status(HttpCodes.BAD_REQUEST)
            .json({ message: error.details[0].message });
      }

      const { id } = req.params;
      const updateData = req.body;
      await this.#service.update(id, updateData);
      return res.status(HttpCodes.OK).json({
        message: CategoryMessages.UpdateSuccess,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLanguage(req, res, next) {
    try {
      const { language } = req.query; // دریافت زبان از query string

      if (!language) {
        return res
          .status(400)
          .json({ message: "زبان مورد نظر ارسال نشده است" });
      }

      const categories = await this.#service.findByLanguage(language);
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
