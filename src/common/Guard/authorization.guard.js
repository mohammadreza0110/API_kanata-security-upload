const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const Authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // بررسی وجود هدر و فرمت صحیح آن
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new createHttpError.Unauthorized("توکن دسترسی غایب یا نامعتبر است");
    }

    // استخراج توکن از هدر
    const accessToken = authHeader.split(" ")[1];

    // بررسی وجود توکن
    if (!accessToken) {
      throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
    }

    // تأیید توکن
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, JWT_SECRET);
    } catch (err) {
      throw new createHttpError.Unauthorized(
        AuthorizationMessage.TokenIsInvalid
      );
    }

    // بررسی معتبر بودن دیکد توکن
    if (!decodedToken || !decodedToken.id) {
      throw new createHttpError.Unauthorized(
        AuthorizationMessage.TokenIsInvalid
      );
    }

    // بررسی وجود کاربر در پایگاه داده
    const user = await UserModel.findById(decodedToken.id)
      .select({
        verifyOTP: 0,
        vrifyOTPToken: 0,
        updatedAt: 0,
        __v: 0,
        password: 0,
      })
      .exec();

    if (!user) {
      throw new createHttpError.Unauthorized(
        AuthorizationMessage.NotFoundAccount
      );
    }

    // افزودن اطلاعات کاربر به درخواست و ادامه
    req.user = user; // اگر اطلاعات توکن و اطلاعات کاربر نیاز است، می‌توانید اینجا اضافه کنید.
    next();
  } catch (error) {
    console.error(error.message); // برای کمک به دیباگ، می‌توانید لاگ خطا را در اینجا اضافه کنید.
    res.status(401).json({ message: "شما اجازه دسترسی به این بخش را ندارید" });
  }
};

module.exports = Authorization;
