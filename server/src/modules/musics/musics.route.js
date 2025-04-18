import { Router } from "express";
import musicsController from "./musics.controller.js";
const musicsRouter = Router();

musicsRouter
  .get("/all", musicsController.getAllMusics)
  .post("/add", musicsController.addMusics)
  .delete("/delete/:id", musicsController.deleteMusics)
  .get("/get/:id", musicsController.getMusicsById)
  .patch("/update/:id", musicsController.updateMusics);

export default musicsRouter;
