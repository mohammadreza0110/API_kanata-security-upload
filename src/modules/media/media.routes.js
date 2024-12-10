const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const MediaController = require("./media.controller");
const { newSectionUpload } = require("../../common/utils/multer");

router.get("/", MediaController.getAllMedia);

router.post(
  "/upload",
  [Authenticaton, isAdmin, newSectionUpload.single("file")],
  MediaController.uploadMedia
);

router.delete(
    "/delete/:fileName",
    [Authenticaton, isAdmin], // احراز هویت و تایید مدیریت
    MediaController.deleteMediaByName
);
module.exports = {
  MediaRouter: router,
};
