// gallery.service.js
const path = require("path");
const fs = require("fs");
const ImageModel = require("./gallery.model");

class GalleryService {
  async checkDuplicateImage(fileHash) {
    const image = await ImageModel.findOne({ fileHash });
    return !!image;
  }

  async saveImage(fileHash, filePath) {
    const uploadsDir = path.resolve(__dirname, "../../../uploads");
    const imgDir = path.resolve(uploadsDir, "img");

    // چک کردن وجود پوشه و در صورت نبودن، ایجاد آن
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    const fileName = path.basename(filePath);
    const relativePath = path.relative(uploadsDir, filePath); // باید شامل img/ باشد
    const fileUrl = `uploads/img/${fileName}`; // اطمینان از شامل بودن img/

    const newImage = new ImageModel({
      fileName,
      fileHash,
      filePath: fileUrl, // ذخیره مسیر صحیح
    });

    // ذخیره تصویر در دیتابیس
    await newImage.save();
  }

  async getImages() {
    const images = await ImageModel.find();
    const uploadsDir = path.resolve(__dirname, "../../../uploads");
    const imgDir = path.resolve(uploadsDir, "img");

    return images
      .map((image) => {
        const relativePathUploads = path.relative(uploadsDir, image.filePath);
        const relativePathImg = path.relative(imgDir, image.filePath);

        let fileUrl = null;

        // چک می‌کنیم آیا تصویر در پوشه uploads قرار دارد
        if (fs.existsSync(image.filePath)) {
          if (relativePathUploads && !relativePathUploads.startsWith("..")) {
            fileUrl = `uploads/${relativePathUploads}`;
          }
          // چک می‌کنیم آیا تصویر در پوشه img درون uploads قرار دارد
          else if (relativePathImg && !relativePathImg.startsWith("..")) {
            fileUrl = `uploads/img/${relativePathImg}`;
          }
        }

        return {
          fileName: image.fileName,
          fileUrl,
        };
      })
      .filter((image) => image.fileUrl); // حذف موارد null در صورت عدم وجود فایل
  }

  async deleteImage(fileName) {
    const image = await ImageModel.findOneAndDelete({ fileName });
    if (!image) {
      throw new Error("تصویر مورد نظر یافت نشد");
    }
    await fs.promises.unlink(
      path.resolve(__dirname, "../../../", image.filePath)
    ); // استفاده از مسیر کامل
  }
}

module.exports = GalleryService;
