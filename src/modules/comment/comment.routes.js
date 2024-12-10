const express = require("express");
const router = express.Router();
const Authenticaton = require("../../common/Guard/authorization.guard");
const isAdmin = require("../../common/middleware/routes/isAdmin.middleware");
const CommentsController = require("./comment.controller");

router.get("/all", [Authenticaton, isAdmin], CommentsController.getAllComments);

router.get(
  "/:id/comments",
  [Authenticaton, isAdmin],
  CommentsController.getComments
);
router.post("/:id/", Authenticaton, CommentsController.addComment);
router.post(
  "/:id/:commentId/",
  Authenticaton,
  CommentsController.answersComment
);
router.patch(
  "/:weblogId/:commentId/visibility",
  [Authenticaton, isAdmin],
  CommentsController.toggleVisibility
);
router.delete(
  "/:weblogId/:commentId",
  [Authenticaton, isAdmin],
  CommentsController.removeComment
);

module.exports = {
  CommentsRouter: router,
};
