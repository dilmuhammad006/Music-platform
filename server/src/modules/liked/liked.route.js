import { Router } from "express";
import likedController from "./liked.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
const likedRouter = Router();

likedRouter
  .post("/like", Protected(true), likedController.like)
  .delete("/unlike", Protected(true), likedController.unlike);

export default likedRouter;
