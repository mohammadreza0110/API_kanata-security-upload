const express = require("express");
const UserController = require("./user.controller");
const Authenticaton = require("../../common/Guard/authorization.guard");
const IsAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const superAdminAuth = require("../../common/middleware/routes/isSuperAdmin.middleware");
const { upload } = require("../../common/utils/multer");

const router = express.Router();

const logRequest = (req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
};

router.get("/users", [Authenticaton, IsAdmin], UserController.getNumberUsers);

router.get("/whoami", Authenticaton, UserController.whoami);

router.post(
  "/uploadProfile/:id",
  [logRequest, upload.single("profilePicture"), Authenticaton],
  UserController.uploadProfile
);

router.put("/changeProfile", Authenticaton, UserController.changeProfile);
router.put("/changePassword", Authenticaton, UserController.changePassword);
router.post("/create-user", UserController.createUser);
router.put(
  "/users/:id",
  [Authenticaton, IsAdmin, superAdminAuth],
  UserController.editUser
);

router.delete(
  "/users/:id",
  [Authenticaton, IsAdmin, superAdminAuth],
  UserController.deleteUser
);

module.exports = {
  UserRoutes: router,
};
