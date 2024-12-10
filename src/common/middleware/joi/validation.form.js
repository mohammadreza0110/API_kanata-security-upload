const Joi = require("joi");

const formSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.base": "نام باید یک رشته متنی باشد",
    "string.empty": "نام الزامی است",
    "string.min": "نام باید حداقل 3 کاراکتر باشد",
    "string.max": "نام نباید بیشتر از 50 کاراکتر باشد",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required()
    .messages({
      "string.pattern.base": "شماره تلفن باید شامل 11 رقم باشد",
      "string.empty": "شماره تلفن الزامی است",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "ایمیل معتبر نیست",
    "string.empty": "ایمیل الزامی است",
  }),
  issue: Joi.string().min(2).max(100).required().messages({
    "string.min": "موضوع باید حداقل 5 کاراکتر باشد",
    "string.max": "موضوع نباید بیشتر از 100 کاراکتر باشد",
    "string.empty": "موضوع الزامی است",
  }),
  msg: Joi.string().min(5).required().messages({
    "string.min": "پیام باید حداقل 5 کاراکتر باشد",
    "string.empty": "پیام الزامی است",
  }),
});

module.exports = {
  formSchema,
};
