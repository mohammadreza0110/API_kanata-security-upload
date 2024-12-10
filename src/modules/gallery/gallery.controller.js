// gallery.controller.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const autoBind = require("auto-bind");
const GalleryService = require("./gallery.service");

class GalleryController {
  #service;
  static DOMAIN =
    process.env.DOMAIN || "https://api.canadaimmigrationconsultants.ca";

  constructor() {
    autoBind(this);
    this.#service = new GalleryService();
  }

  async generateFileHash(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const stream = fs.createReadStream(filePath);

      stream.on("data", (data) => hash.update(data));
      stream.on("end", () => resolve(hash.digest("hex")));
      stream.on("error", (err) => reject(err));
    });
  }

  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "هیچ فایلی آپلود نشده است" });
      }

      // تغییر مسیر به پوشه img
      const filePath = path.resolve(
        __dirname,
        `../../../uploads/img/${req.file.filename}`
      );
      const fileHash = await this.generateFileHash(filePath);

      const isDuplicate = await this.#service.checkDuplicateImage(fileHash);

      if (isDuplicate) {
        await fs.promises.unlink(filePath);
        return res
          .status(400)
          .json({ message: "این تصویر قبلاً آپلود شده است" });
      }

      await this.#service.saveImage(fileHash, filePath);

      const fileUrl = `${GalleryController.DOMAIN}/uploads/img/${req.file.filename}`;
      return res
        .status(200)
        .json({ message: "تصویر با موفقیت آپلود شد", fileUrl });
    } catch (error) {
      next(error);
    }
  }

  async getImages(req, res, next) {
    try {
      const images = await this.#service.getImages();
      const updatedImages = images.map((image) => ({
        fileName: image.fileName,
        fileUrl: `${GalleryController.DOMAIN}/${image.fileUrl}`,
      }));
      return res
        .status(200)
        .json({ message: "تصاویر با موفقیت دریافت شد", images: updatedImages });
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req, res, next) {
    try {
      const { fileName } = req.params;

      if (!fileName) {
        return res.status(400).json({ message: "نام فایل ارسال نشده است" });
      }

      await this.#service.deleteImage(fileName);
      return res.status(200).json({ message: "تصویر با موفقیت حذف شد" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GalleryController();
