const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const WeblogController = require("./weblog.controller");
const { upload } = require("../../common/utils/multer");

// تعریف مسیر برای وبلاگ‌های مرتب شده بر اساس بازدید
router.get("/sortedByViews", WeblogController.findByViews);
router.get("/", WeblogController.find);
router.get("/byLanguage", WeblogController.findByLanguage);
router.get("/search", WeblogController.search);
router.get("/:id", WeblogController.findOne);
router.get("/:id/changeLanguage", WeblogController.changeLanguage);


router.post("/", [Authenticaton, isAdmin], WeblogController.create);
router.post(
  "/:id/uploadImage",
  upload.single("image"),
  WeblogController.uploadBlogImage
);

router.put("/:id", [Authenticaton, isAdmin], WeblogController.updateWeblog);

router.delete("/:id", [Authenticaton, isAdmin], WeblogController.deleteWeblog);

module.exports = {
  WeblogRouter: router,
};
