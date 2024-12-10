const Joi = require("joi");

const localizedCategorySchema = Joi.object({
  language: Joi.string().required().messages({
    "string.base": "زبان باید یک رشته متنی باشد",
    "string.empty": "زبان الزامی است",
  }),
  name: Joi.string().max(30).required().messages({
    "string.base": "نام باید یک رشته متنی باشد",
    "string.empty": "نام الزامی است",
    "string.max": "نام نباید بیشتر از 30 کاراکتر باشد",
  }),
  slug: Joi.string().min(3).max(30).required().messages({
    "string.base": "شناسه باید یک رشته متنی باشد",
    "string.empty": "شناسه الزامی است",
    "string.min": "شناسه باید حداقل 3 کاراکتر باشد",
    "string.max": "شناسه نباید بیشتر از 30 کاراکتر باشد",
  }),
});

const categorySchema = Joi.object({
  localizedContent: Joi.array()
    .items(localizedCategorySchema)
    .required()
    .messages({
      "array.base": "محتوای محلی باید یک آرایه باشد",
      "array.empty": "محتوای محلی الزامی است",
      "array.includesRequiredUnknowns":
        "هر عنصر از محتوای محلی باید با اسکیما تطابق داشته باشد",
    }),
  parent: Joi.string()
    .allow(null, "")
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.pattern.base": "شناسه والد باید یک شناسه معتبر باشد",
    }),
  slug: Joi.string().min(3).max(30).optional().messages({
    "string.base": "شناسه باید یک رشته متنی باشد",
    "string.empty": "شناسه نباید خالی باشد",
    "string.min": "شناسه باید حداقل 3 کاراکتر باشد",
    "string.max": "شناسه نباید بیشتر از 30 کاراکتر باشد",
  }),
});

module.exports = {
  categorySchema,
};
