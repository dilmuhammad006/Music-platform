import { Router } from "express";
import musicianController from "./musician.controller.js";
const musicianRouter = Router();

musicianRouter
  .get("/all", musicianController.getAllMusicians)
  .post("/add", musicianController.addMusicians);

export default musicianRouter;
