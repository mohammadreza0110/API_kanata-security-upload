const express = require("express");
const FormController = require("./formAdv.controller");
const Authentication = require("../../common/Guard/authorization.guard");
const IsAdmin = require("../../common/middleware/routes/isAdmin.middleware");

const router = express.Router();


// Route to submit the form (POST)
router.post("/evaluation-form", FormController.submitForm);

// Route to get a specific form
router.get("/evaluation-form/:id", [Authentication, IsAdmin], FormController.getFormById);


// Route to update a specific form by ID (PUT)
router.put("/evaluation-form/:id", [Authentication, IsAdmin], // Updating requires authentication and admin privileges
    FormController.updateFormById);

// Route to delete a form (DELETE)
router.delete("/evaluation-form/:id", [Authentication, IsAdmin], FormController.deleteFormById);
router.get("/evaluation-forms", FormController.getAllForms); // اضافه کردن روت برای گرفتن همه فرم‌ها

module.exports = {
    FormAdvRoutes: router,
};
