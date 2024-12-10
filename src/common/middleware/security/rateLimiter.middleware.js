const rateLimit = require("express-rate-limit");
const logger = require("../../../config/logger.config");

const setupRateLimiter = (app, routesToProtect = []) => {
  const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100,
    message:
      process.env.RATE_LIMIT_MESSAGE ||
      "تعداد درخواست‌های بیش از حد از این IP، لطفا بعدا تلاش کنید",
    handler: (req, res) => {
      logger.warn("تعداد درخواست‌های بیش از حد", {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
      });
      res.status(429).json({
        success: false,
        message:
          "تعداد درخواست‌های شما بیش از حد مجاز است، لطفا بعدا دوباره تلاش کنید.",
      });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply rate limiting to the specified routes
  routesToProtect.forEach((route) => {
    app.use(route, limiter);
  });

  // Exclude '/uploads' from rate limiting
  app.use("/uploads", (req, res, next) => {
    // Disable rate limiting on this route
    next();
  });
};

module.exports = setupRateLimiter;
