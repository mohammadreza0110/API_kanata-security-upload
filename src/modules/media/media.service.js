const fs = require("fs");
const crypto = require("crypto");
const MediaModel = require("./media.model"); // مسیر مدل رسانه

class MediaService {
  async uploadFile(file) {
    if (!file) {
      throw new Error("لطفاً فایلی را برای آپلود ارائه دهید.");
    }

    const fileHash = crypto
      .createHash("sha256")
      .update(fs.readFileSync(file.path))
      .digest("hex");

    const existingFile = await MediaModel.findOne({ fileHash });

    if (existingFile) {
      throw new Error("این فایل قبلاً در سیستم ثبت شده است.");
    }

    const filePath = file.path.replace(/^.*[\\/]/, ""); // حذف پیشوند پوشه uploads از مسیر

    const newMedia = new MediaModel({
      fileName: file.originalname,
      fileHash,
      filePath,
    });

    await newMedia.save();

    return filePath;
  }

  async getAllMedia() {
    try {
      const mediaFiles = await MediaModel.find({});
      return mediaFiles;
    } catch (error) {
      throw new Error("خطا در بازیابی فایل‌های رسانه: " + error.message);
    }
  }



  async deleteMediaByFileName(fileName) {
    try {
      const mediaFile = await MediaModel.findOne({ fileName });

      if (!mediaFile) {
        throw new Error("فایلی با این نام یافت نشد.");
      }

      const filePath = `uploads/media/${mediaFile.filePath}`; // مسیر کامل فایل

      // حذف فایل از دیسک
      fs.unlinkSync(filePath);

      // حذف اطلاعات فایل از پایگاه داده
      await MediaModel.findOneAndDelete({ fileName });

      return { message: "فایل با موفقیت حذف شد." };
    } catch (error) {
      throw new Error("خطا در حذف فایل: " + error.message);
    }
  }
}

module.exports = MediaService; // Export the class
