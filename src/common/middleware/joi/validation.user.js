const Joi = require("joi");

const editUserSchema = Joi.object({
  fullName: Joi.string().max(50).allow(null, "").optional().messages({
    "string.base": "نام باید یک رشته متنی باشد",
    "string.max": "نام نباید بیشتر از 50 کاراکتر باشد",
  }),
  fullNameEnglish: Joi.string().max(50).allow(null, "").optional().messages({
    "string.base": "نام انگلیسی باید یک رشته متنی باشد",
    "string.max": "نام انگلیسی نباید بیشتر از 50 کاراکتر باشد",
  }),
  password: Joi.string().allow(null, "").optional().messages({
    "string.base": "رمز عبور باید یک رشته متنی باشد",
  }),
  email: Joi.string().email().allow(null, "").optional().messages({
    "string.email": "ایمیل باید معتبر باشد",
    "string.base": "ایمیل باید یک رشته متنی باشد",
  }),
  role: Joi.string()
    .valid("user", "admin", "superAdmin")
    .allow(null, "")
    .optional()
    .messages({
      "any.only":
        "نقش باید یکی از مقادیر 'user', 'admin', یا 'superAdmin' باشد",
    }),
  biography: Joi.string()
    .max(500)
    .allow(null, "")
    .allow("")
    .optional()
    .messages({
      "string.base": "بیوگرافی باید یک رشته متنی باشد",
      "string.max": "بیوگرافی نباید بیشتر از 500 کاراکتر باشد",
    }),
});

const changeProfileSchema = Joi.object({
  fullName: Joi.string().max(50).allow(null, "").optional().messages({
    "string.base": "نام باید یک رشته متنی باشد",
    "string.max": "نام نباید بیشتر از 50 کاراکتر باشد",
  }),
  fullNameEnglish: Joi.string().max(50).allow(null, "").optional().messages({
    "string.base": "نام انگلیسی باید یک رشته متنی باشد",
    "string.max": "نام انگلیسی نباید بیشتر از 50 کاراکتر باشد",
  }),
  email: Joi.string().email().allow(null, "").optional().messages({
    "string.email": "ایمیل باید معتبر باشد",
    "string.base": "ایمیل باید یک رشته متنی باشد",
  }),
  biography: Joi.string()
    .max(500)
    .allow(null, "")
    .allow("")
    .optional()
    .messages({
      "string.base": "بیوگرافی باید یک رشته متنی باشد",
      "string.max": "بیوگرافی نباید بیشتر از 500 کاراکتر باشد",
    }),
});

module.exports = {
  editUserSchema,
  changeProfileSchema,
};
