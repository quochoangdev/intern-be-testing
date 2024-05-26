import express from "express";
import categoriesController from "../controllers/categoriesController";
import postsController from "../controllers/postsController";

const router = express.Router();

const adminRoute = (app) => {
  // Categories
  router.get("/categories/read", categoriesController.readFunc);
  router.post("/categories/create", categoriesController.createFunc);
  router.put("/categories/update", categoriesController.updateFunc);
  router.delete("/categories/delete", categoriesController.deleteFunc);

  // Posts
  router.get("/posts/read", postsController.readFunc);
  router.post("/posts/create", postsController.createFunc);
  router.put("/posts/update", postsController.updateFunc);
  router.delete("/posts/delete", postsController.deleteFunc);

  return app.use("/api/v1", router);
};

export default adminRoute;
