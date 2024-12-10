const createHttpError = require("http-errors");
const AuthorizationMessage = require("../../messages/auth.message");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin" && user.role !== "superAdmin") {
      throw new createHttpError.Forbidden(AuthorizationMessage.Forbidden);
    }

    next();
  } catch (ex) {
    next(ex);
  }
};
