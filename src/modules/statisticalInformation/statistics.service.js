const autoBind = require("auto-bind");
const createHttpError = require("http-errors");

const UserModel = require("../user/user.model");
const WeblogModel = require("../weblog/weblog.model");
const FormModel = require("../form/form.model");
class StatisticsService {
  #model;
  #weblogModel;
  #formModel;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
    this.#weblogModel = WeblogModel;
    this.#formModel = FormModel;
  }

  async countUsers() {
    try {
      // دریافت تعداد کل کاربران
      const totalUsers = await this.#model.countDocuments();
      return totalUsers;
    } catch (error) {
      // استفاده از createHttpError برای ایجاد خطای مناسب
      throw createHttpError(
        500,
        "خطا در دریافت تعداد کاربران: " + error.message
      );
    }
  }

  async countWeblogs() {
    try {
      const totalWeblogs = await this.#weblogModel.countDocuments();
      return totalWeblogs;
    } catch (error) {
      throw createHttpError(
        500,
        `خطا در دریافت تعداد وبلاگ‌ها: ${error.message}`
      );
    }
  }

  async countForms() {
    try {
      const totalForms = await this.#formModel.countDocuments();
      return totalForms;
    } catch (error) {
      throw createHttpError(
        500,
        `خطا در دریافت تعداد فرم‌ها: ${error.message}`
      );
    }
  }

  async countWeeklyViews(startDate, endDate) {
    try {
      // تبدیل تاریخ‌ها به شیء Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        throw createHttpError(
          400,
          "تاریخ‌های ورودی نامعتبر است یا تاریخ شروع بعد از تاریخ پایان است"
        );
      }

      // محاسبه بازدیدهای هفتگی
      const weeklyViews = await WeblogModel.aggregate([
        {
          $match: {
            dateCreated: { $gte: start, $lte: end },
            views: { $gt: 0 }, // فقط بازدیدهای بیشتر از صفر را در نظر بگیرید
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$dateCreated" },
              week: { $isoWeek: "$dateCreated" },
            },
            totalViews: { $sum: "$views" },
            firstDateOfWeek: { $min: "$dateCreated" },
          },
        },
        {
          $sort: { firstDateOfWeek: 1 },
        },
        {
          $project: {
            _id: 0,
            startDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$firstDateOfWeek" },
            },
            endDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: {
                  $dateAdd: {
                    startDate: "$firstDateOfWeek",
                    unit: "day",
                    amount: 6,
                  },
                },
              },
            },
            totalViews: 1,
          },
        },
      ]);

      console.log("Weekly Views Aggregated Data:", weeklyViews);

      // ایجاد هفته‌ها فقط برای بازه زمانی انتخاب شده
      const result = [];
      let currentStart = new Date(start);

      while (currentStart <= end) {
        const weekStart = currentStart.toISOString().split("T")[0];
        const weekEnd = new Date(currentStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        if (weekEnd > end) weekEnd.setTime(end.getTime());

        const weekEndStr = weekEnd.toISOString().split("T")[0];

        const weekData = weeklyViews.find(
          (week) => week.startDate === weekStart
        );

        console.log(`Week from ${weekStart} to ${weekEndStr}:`, weekData);

        result.push({
          startDate: weekStart,
          endDate: weekEndStr,
          totalViews: weekData ? weekData.totalViews : 0,
        });

        currentStart.setDate(currentStart.getDate() + 7);
      }

      return {
        data: result,
        message: "تعداد بازدیدهای هفتگی با موفقیت دریافت شد",
      };
    } catch (error) {
      throw createHttpError(
        500,
        `خطا در شمارش بازدیدهای هفتگی: ${error.message}`
      );
    }
  }
}

module.exports = new StatisticsService();
