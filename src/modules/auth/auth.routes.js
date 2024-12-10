const express = require("express");
const authController = require("./auth.controller"); // اطمینان حاصل کنید که مسیر صحیح است

const router = express.Router();

// تعریف مسیرها و توابع مربوطه
router.post("/login", authController.loginUser);
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgotPassword); // با توجه به نام تابع در کنترلر
router.post("/verify-code", authController.verifyOTPCode); // با توجه به نام تابع در کنترلر
router.post("/change-password", authController.ChangePassword); // با توجه به نام تابع در کنترلر

module.exports = {
  AuthRoutes: router,
};
