const autoBind = require("auto-bind");
const MediaService = require("./media.service"); // Ensure this path is correct

class MediaController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = new MediaService(); // Create an instance of MediaService
  }

  async uploadMedia(req, res, next) {
    try {
      const file = req.file; // فایل آپلود شده

      const filePath = await this.#service.uploadFile(file);

      return res.status(200).json({
        message: "رسانه با موفقیت آپلود شد.",
        file: filePath,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllMedia(req, res, next) {
    try {
      const mediaFiles = await this.#service.getAllMedia();

      const baseUrl = `/uploads/media/`; // ایجاد آدرس پایه
      const filesWithFullPath = mediaFiles.map((file) => ({
        fileName: file.fileName,
        filePath: `${baseUrl}${file.filePath}`, // اضافه کردن آدرس کامل
      }));

      return res.status(200).json({
        files: filesWithFullPath,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  async deleteMediaByName(req, res, next) {
    try {
      const fileName = req.params.fileName; // دریافت نام فایل از پارامترهای مسیر
      const result = await this.#service.deleteMediaByFileName(fileName);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MediaController();
