const logger = require("../../../config/logger.config");

const setupLogging = (app) => {
  app.use((req, res, next) => {
    logger.info("Request received", {
      meta: {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        method: req.method,
        url: req.originalUrl,
      },
    });
    next();
  });
};

module.exports = setupLogging;
