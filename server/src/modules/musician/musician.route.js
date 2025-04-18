import { Router } from "express";
import musicianController from "./musician.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
const musicianRouter = Router();

musicianRouter
  .get("/all", Protected(true), musicianController.getAllMusicians)
  .post("/add", Protected(true), musicianController.addMusicians);

export default musicianRouter;