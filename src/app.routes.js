const express = require("express");
const { AuthRoutes } = require("./modules/auth/auth.routes");
const { UserRoutes } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { WeblogRouter } = require("./modules/weblog/weblog.routes");
const { FormRouter } = require("./modules/form/form.routes");
const { CommentsRouter } = require("./modules/comment/comment.routes");
const { GalleryRouter } = require("./modules/gallery/gallery.routes");
const { MediaRouter } = require("./modules/media/media.routes");
const { FormAdvRoutes } = require("./modules/formAdv/formAdv.routes");
const {
  StatisticsRouter,
} = require("./modules/statisticalInformation/statistics.routes");

const router = express.Router();

// Define route groups
const routes = {
  auth: AuthRoutes,
  user: UserRoutes,
  category: CategoryRouter,
  weblogs: WeblogRouter,
  form: FormRouter,
  statistics: StatisticsRouter,
  comment: CommentsRouter,
  gallery: GalleryRouter,
  media: MediaRouter,
  formAdv: FormAdvRoutes,
};

// Apply routes to the main router
Object.entries(routes).forEach(([path, route]) => {
  router.use(`/${path}`, route);
});

module.exports = { mainRouter: router };
