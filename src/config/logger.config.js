const winston = require("winston");
const { MongoDB } = require("winston-mongodb");
const dotenv = require("dotenv");

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MONGO_URL, // آدرس پایگاه داده MongoDB
      collection: "logs", // نام مجموعه برای ذخیره لاگ‌ها
      level: "info",
      tryReconnect: true,
      options: {
        useUnifiedTopology: true, // تنظیم برای نسخه‌های جدید
      },
    }),
  ],
});

// افزوده کردن یک فرمت شخصی برای ذخیره لاگ‌ها با اطلاعات اضافی
logger.format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format((info) => {
    // اطمینان از اینکه meta به درستی در لاگ‌ها ذخیره می‌شود
    if (info.meta) {
      info.message = `${info.message} ${JSON.stringify(info.meta)}`;
    }
    return info;
  })()
);

module.exports = logger;
