const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const GalleryController = require("./gallery.controller");
const { upload } = require("../../common/utils/multer");

router.get("/images", [Authenticaton, isAdmin], GalleryController.getImages);
router.post(
  "/upload",
  [Authenticaton, isAdmin, upload.single("image")],
  GalleryController.uploadImage
);
router.delete(
  "/:fileName",
  [Authenticaton, isAdmin],
  GalleryController.deleteImage
);
module.exports = {
  GalleryRouter: router,
};
