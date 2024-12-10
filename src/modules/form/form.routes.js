const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const FormController = require("./form.controller");

router.get("/messages", [Authenticaton, isAdmin], FormController.showMsg);
router.get("/messages/:id", [Authenticaton, isAdmin], FormController.getShow);
router.post("/sendMsg", FormController.sendMsg);
router.delete(
  "/messages/:id",
  [Authenticaton, isAdmin],
  FormController.deleteMsg
);
module.exports = {
  FormRouter: router,
};
