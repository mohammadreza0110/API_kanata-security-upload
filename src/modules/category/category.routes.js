const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const CategoryController = require("./category.controller");

router.post("/", [Authenticaton, isAdmin], CategoryController.create);
router.get("/", CategoryController.find);
router.get("/language", CategoryController.findByLanguage);

router.put("/:id", [Authenticaton, isAdmin],CategoryController.update); // ویرایش دسته‌بندی
router.delete("/:id",[Authenticaton, isAdmin], CategoryController.delete); // حذف دسته‌بندی
module.exports = {
  CategoryRouter: router,
};
