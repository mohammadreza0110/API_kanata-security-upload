const Joi = require("joi");

// تعریف اسکیماهای جویی
const phoneSchema = Joi.string()
  .pattern(/^[0-9]{11}$/)
  .messages({
    "string.pattern.base": "شماره تلفن باید شامل 11 رقم و فقط شامل اعداد باشد",
    "string.empty": "شماره تلفن الزامی است",
  });

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } }) // بررسی صحت ساختار ایمیل
  .messages({
    "string.email": "ایمیل باید معتبر باشد",
    "string.empty": "ایمیل الزامی است",
  });

const passwordSchema = Joi.string().min(4).required().messages({
  "string.min": "رمز عبور باید حداقل 4 کاراکتر باشد",
  "string.empty": "رمز عبور الزامی است",
});

const fullNameSchema = Joi.string().min(3).required().messages({
  "string.min": "نام کامل باید حداقل 3 کاراکتر باشد",
  "string.empty": "نام کامل الزامی است",
});

const codeSchema = Joi.string()
  .pattern(/^[0-9]{6}$/)
  .required()
  .messages({
    "string.pattern.base": "کد باید شامل 6 رقم و فقط شامل اعداد باشد",
    "string.empty": "کد تایید الزامی است",
  });

// اسکیما برای تغییر پسورد
const changePasswordSchema = Joi.object({
  phone: phoneSchema.required(),
  newPassword: passwordSchema,
}).unknown(false); // جلوگیری از ورود فیلدهای غیرمجاز

const registerSchema = Joi.object({
  identifier: Joi.alternatives()
    .try(phoneSchema, emailSchema)
    .required()
    .messages({
      "alternatives.match": "ورودی باید یک شماره تلفن یا یک ایمیل معتبر باشد",
      "any.required": "تلفن یا ایمیل الزامی است",
    }),
  password: passwordSchema,
  fullName: fullNameSchema,
}).unknown(false); // جلوگیری از ورود فیلدهای غیرمجاز

const loginSchema = Joi.object({
  identifier: Joi.alternatives()
    .try(phoneSchema, emailSchema)
    .required()
    .messages({
      "alternatives.match": "ورودی باید یک شماره تلفن یا یک ایمیل معتبر باشد",
      "any.required": "تلفن یا ایمیل الزامی است",
    }),
  password: passwordSchema,
}).unknown(false); // جلوگیری از ورود فیلدهای غیرمجاز

const sendOTPSchema = Joi.object({
  phone: phoneSchema.required(),
});

const verifyOTPSchema = Joi.object({
  phone: phoneSchema.required(),
  code: codeSchema,
});

module.exports = {
  registerSchema,
  loginSchema,
  sendOTPSchema,
  verifyOTPSchema,
  changePasswordSchema, // اضافه کردن اسکیما تغییر پسورد
};
