const Joi = require("joi");

const localizedContentSchema = Joi.array()
  .items(
    Joi.object({
      language: Joi.string().required().messages({
        "string.base": "زبان باید یک رشته متنی باشد",
        "string.empty": "زبان الزامی است",
      }),
      title: Joi.string().min(3).max(100).required().messages({
        "string.base": "عنوان باید یک رشته متنی باشد",
        "string.empty": "عنوان الزامی است",
        "string.min": "عنوان باید حداقل 3 کاراکتر باشد",
        "string.max": "عنوان نباید بیشتر از 100 کاراکتر باشد",
      }),
      content: Joi.string().min(10).required().messages({
        "string.base": "محتوا باید یک رشته متنی باشد",
        "string.empty": "محتوا الزامی است",
        "string.min": "محتوا باید حداقل 10 کاراکتر باشد",
      }),
      owner: Joi.string().required().messages({
        "string.base": "نام نویسنده باید یک رشته متنی باشد",
        "string.empty": "نام نویسنده الزامی است",
      }),
    })
  )
  .required()
  .messages({
    "array.base": "محتوای محلی باید به صورت یک آرایه باشد",
    "array.empty": "محتوای محلی الزامی است",
  });

const createWeblogSchema = Joi.object({
  categoryId: Joi.string().required().messages({
    "string.empty": "شناسه دسته‌بندی الزامی است",
  }),
});

const updateWeblogSchema = Joi.object({
  categoryId: Joi.string().required().messages({
    "string.empty": "شناسه دسته‌بندی الزامی است",
  }),
});

const addCommentSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    "string.base": "محتوای نظر باید یک رشته متنی باشد",
    "string.empty": "محتوای نظر الزامی است",
    "string.min": "محتوای نظر باید حداقل 1 کاراکتر باشد",
  }),
});

const answerCommentSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    "string.base": "محتوای پاسخ باید یک رشته متنی باشد",
    "string.empty": "محتوای پاسخ الزامی است",
    "string.min": "محتوای پاسخ باید حداقل 1 کاراکتر باشد",
  }),
});

module.exports = {
  createWeblogSchema,
  updateWeblogSchema,
  addCommentSchema,
  answerCommentSchema,
};
