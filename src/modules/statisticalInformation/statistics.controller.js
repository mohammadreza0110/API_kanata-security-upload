const autoBind = require("auto-bind");
const StatisticsService = require("./statistics.service");
const createHttpError = require("http-errors");
class StatisticsController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = StatisticsService;
  }
  async registration(req, res, next) {
    try {
      // دریافت تعداد کل کاربران
      const totalUsers = await this.#service.countUsers();

      // بازگشت تعداد کاربران به صورت JSON
      return res.status(200).json({
        data: {
          totalUsers,
        },
        message: "تعداد کل کاربران با موفقیت دریافت شد",
      });
    } catch (error) {
      // استفاده از createHttpError برای ایجاد خطای مناسب
      return next(
        createHttpError(500, "خطا در دریافت تعداد کاربران: " + error.message)
      );
    }
  }

  async countWeblogs(req, res, next) {
    try {
      const totalWeblogs = await this.#service.countWeblogs();
      return res.status(200).json({
        data: { totalWeblogs },
        message: "تعداد کل وبلاگ‌ها با موفقیت دریافت شد",
      });
    } catch (error) {
      next(
        createHttpError(500, "خطا در دریافت تعداد وبلاگ‌ها: " + error.message)
      );
    }
  }

  async countForms(req, res, next) {
    try {
      const totalForms = await this.#service.countForms();
      return res.status(200).json({
        data: { totalForms },
        message: "تعداد کل فرم‌ها با موفقیت دریافت شد",
      });
    } catch (error) {
      next(
        createHttpError(500, "خطا در دریافت تعداد فرم‌ها: " + error.message)
      );
    }
  }

  async countWeeklyViews(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      // بررسی وجود تاریخ‌ها
      if (!startDate || !endDate) {
        return res.status(400).json({
          message: "تاریخ شروع و پایان باید وارد شوند",
        });
      }

      // فراخوانی تابع سرویس برای شمارش بازدیدهای هفتگی
      const weeklyViews = await this.#service.countWeeklyViews(
        startDate,
        endDate
      );

      return res.status(200).json({
        data: weeklyViews,
        message: "تعداد بازدیدهای هفتگی با موفقیت دریافت شد",
      });
    } catch (error) {
      next(
        createHttpError(
          500,
          "خطا در دریافت تعداد بازدیدهای هفتگی: " + error.message
        )
      );
    }
  }
}

module.exports = new StatisticsController();
