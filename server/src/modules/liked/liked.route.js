import { Router } from "express";
import likedController from "./liked.controller.js";
const likedRouter = Router();

likedRouter
  .post("/like", likedController.like)
  .delete("/unlike", likedController.unlike);

export default likedRouter;
