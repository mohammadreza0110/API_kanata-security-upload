const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const StatisticsController = require("./statistics.controller");

router.get(
  "/registration",
  [Authenticaton, isAdmin],
  StatisticsController.registration
);
router.get(
  "/weblogs",
  [Authenticaton, isAdmin],
  StatisticsController.countWeblogs
);
router.get("/forms", [Authenticaton, isAdmin], StatisticsController.countForms);
router.get(
  "/weekly-views",
  [Authenticaton, isAdmin],
  StatisticsController.countWeeklyViews
);
module.exports = {
  StatisticsRouter: router,
};
