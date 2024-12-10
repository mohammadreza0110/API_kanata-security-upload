const AuthorizationMessage = Object.freeze({
  Unauthorized: "شما اجازه دسترسی به این بخش را ندارید",
  Login: "لطفا ابتدا وارد شوید",
  Logout: "خروج با موفقیت انجام شد",
  LoginAgain: "لطفا دوباره وارد شوید",
  NotFoundAccount: "کاربری با این موبایل وجود ندارد",
  TokenIsInvalid: "توکن نامعتبر است",
  Forbidden: "به سطح دسترسی ادمین نیاز دارید",
  ForbiddenRole: "شما نمیتونید روی سوپر ادمین تغییرات ایجاد کنید",
  UserNotFound: "کاربر وجود ندارد",
});

module.exports = AuthorizationMessage;
