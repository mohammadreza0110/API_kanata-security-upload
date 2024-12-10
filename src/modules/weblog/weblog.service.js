const autoBind = require("auto-bind");
const WeblogModel = require("./weblog.model");
const { weblogMessages } = require("./weblog.massage");
const createHttpError = require("http-errors");
class WeblogService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = WeblogModel;
  }

  async getAllWeblogs(page, limit) {
    const skip = (page - 1) * limit;
    const totalItems = await this.#model.countDocuments().exec();

    // استفاده از sort برای مرتب‌سازی بر اساس dateCreated به ترتیب نزولی
    const data = await this.#model
      .find()
      .sort({ dateCreated: -1 }) // مرتب‌سازی نزولی، 1 برای صعودی
      .skip(skip)
      .limit(limit)
      .populate({
        path: "owner",
        select: "fullName", // انتخاب فیلد name از مدل user
      })
      .populate({
        path: "category",
        select: "name", // انتخاب فیلد name از مدل Category
      })
      .exec();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
    };
  }

  async getOneWeblogs(id) {
    const weblog = await this.#model
      .findById(id)
      .populate("category", "name") // در صورت نیاز به جزییات دسته‌بندی
      .populate("comments.userId", "fullName"); // در صورت نیاز به جزییات کاربر

    if (!weblog) throw new createHttpError.NotFound(weblogMessages.NotFound);

    // تابعی برای محاسبه تعداد کل کامنت‌ها و پاسخ‌ها
    const countComments = (comments) => {
      let count = comments.length;
      comments.forEach((comment) => {
        count += countComments(comment.answers);
      });
      return count;
    };

    const totalComments = countComments(weblog.comments);

    return { ...weblog.toObject(), totalComments };
  }

  async createWeblog(data) {
    const newWeblog = new this.#model(data);
    return await newWeblog.save();
  }

  async updateBlogImage(weblogId, imagePath) {
    const weblog = await this.#model.findByIdAndUpdate(
      weblogId,
      { image: imagePath },
      { new: true, lean: true }
    );

    if (!weblog) {
      throw new Error("Weblog not found");
    }

    return weblog;
  }

  async updateWeblog(id, updateData) {
    try {
      // بررسی وجود دسته‌بندی و بروزرسانی category
      if (updateData.categoryId) {
        const categoryExists = await this.#model.findById(updateData.categoryId);
        if (!categoryExists) {
          throw new Error("دسته‌بندی یافت نشد");
        }
        updateData.category = updateData.categoryId;
      }

      const updatedWeblog = await this.#model.findByIdAndUpdate(
          id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
      ).populate("category"); // اضافه کردن populate برای دریافت دسته‌بندی

      if (!updatedWeblog) {
        throw new Error("وبلاگ یافت نشد");
      }

      return updatedWeblog;
    } catch (error) {
      throw new Error("خطا در ویرایش وبلاگ: " + error.message);
    }
  }

  async deleteWeblog(id) {
    try {
      const deletedWeblog = await this.#model.findByIdAndDelete(id);

      if (!deletedWeblog) {
        throw new Error("وبلاگ یافت نشد");
      }

      return deletedWeblog;
    } catch (error) {
      throw new Error("خطا در حذف وبلاگ: " + error.message);
    }
  }

  async changeLanguage(weblogId, language) {
    const weblog = await this.#model
      .findById(weblogId)
      .populate("owner", language === "fa" ? "fullName" : "fullNameEnglish")
      .populate({
        path: "category",
        populate: {
          path: "localizedContent",
          match: { language: language },
        },
      })
      .populate(
        "comments.userId",
        language === "fa" ? "fullName" : "fullNameEnglish"
      )
      .exec(); // از lean() استفاده نکنید

    if (!weblog) {
      throw new Error("Weblog not found");
    }

    weblog.views += 1;
    await this.#model.updateOne({ _id: weblogId }, { views: weblog.views });

    const localizedContent = weblog.localizedContent.find(
      (content) => content.language === language
    );

    if (!localizedContent) {
      throw new Error("Content in the requested language not found");
    }

    const localizedCategoryContent = weblog.category.localizedContent.find(
      (content) => content.language === language
    );

    if (!localizedCategoryContent) {
      throw new Error("Category content in the requested language not found");
    }

    const countComments = (comments) => {
      let count = comments.length;
      comments.forEach((comment) => {
        count += countComments(comment.answers);
      });
      return count;
    };

    const totalComments = countComments(weblog.comments);

    const result = {
      ...weblog.toObject(), // تبدیل وبلاگ به شیء ساده
      owner: {
        _id: weblog.owner._id,
        fullName:
          language === "fa"
            ? weblog.owner.fullName
            : weblog.owner.fullNameEnglish,
      },
      localizedContent,
      category: {
        _id: weblog.category._id,
        name: localizedCategoryContent.name,
      },
      totalComments,
    };

    return result;
  }

  async getWeblogsByLanguage(language, page, limit, search) {
    const skip = (page - 1) * limit;

    // فیلتر زبان و متن جستجو
    const searchQuery = {
      "localizedContent.language": language,
      $or: [
        { "localizedContent.title": { $regex: search, $options: "i" } }, // جستجو در عنوان
        { "localizedContent.description": { $regex: search, $options: "i" } }, // جستجو در توضیحات
      ],
    };

    const totalItems = await this.#model
        .countDocuments(searchQuery)
        .exec();

    const data = await this.#model
        .find(searchQuery)
        .sort({ dateCreated: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "owner",
          select: language === "fa" ? "fullName" : "fullNameEnglish", // انتخاب فیلد مناسب براساس زبان
        })
        .populate({
          path: "category",
          populate: {
            path: "localizedContent",
            match: { language: language }, // فیلتر کردن محتوای محلی‌سازی‌شده براساس زبان
            select: "name", // انتخاب فیلد name از محتوای محلی‌سازی‌شده
          },
        })
        .exec();

    const filteredData = data.map((weblog) => {
      weblog = weblog.toObject();

      const totalComments = weblog.comments.length;

      weblog.localizedContent = weblog.localizedContent.filter(
          (content) => content.language === language
      );

      let category = null;
      if (weblog.category && weblog.category.localizedContent) {
        const localizedCategoryContent = weblog.category.localizedContent.find(
            (content) => content.language === language
        );

        category = {
          _id: weblog.category._id,
          name: localizedCategoryContent ? localizedCategoryContent.name : null,
        };
      }

      const { comments, ...weblogWithoutComments } = weblog;

      return {
        ...weblogWithoutComments,
        category,
        totalComments,
      };
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: filteredData,
      totalItems,
      totalPages,
    };
  }

  async getAllWeblogsSortedByViews() {
    // بازیابی و مرتب‌سازی وبلاگ‌ها بر اساس تعداد بازدیدها به ترتیب نزولی
    const data = await this.#model
      .find()
      .sort({ views: -1 }) // مرتب‌سازی نزولی بر اساس تعداد بازدیدها
      .populate({
        path: "owner",
        select: "fullName", // انتخاب فیلد fullName از مدل user
      })
      .populate({
        path: "category",
        select: "name", // انتخاب فیلد name از مدل Category
      })
      .exec();

    return data;
  }

  // سرویس جستجو
  async searchWeblogs(searchTerm, page, limit) {
    const skip = (page - 1) * limit;

    // جستجو بر اساس فیلد title
    const data = await this.#model
        .find({ title: new RegExp(searchTerm, "i") }) // استفاده از regex برای جستجوی بخشی
        .skip(skip)
        .limit(limit)
        .exec();

    const totalItems = await this.#model.countDocuments({
      title: new RegExp(searchTerm, "i"),
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
    };
  }

}

module.exports = new WeblogService();
