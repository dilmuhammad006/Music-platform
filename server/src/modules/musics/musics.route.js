import { Router } from "express";
import musicsController from "./musics.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
const musicsRouter = Router();

musicsRouter
  .get("/all", Protected(true), musicsController.getAllMusics)
  .post("/add", Protected(true), musicsController.addMusics)
  .delete("/delete/:id", Protected(true), musicsController.deleteMusics)
  .get("/get/:id", Protected(true), musicsController.getMusicsById)
  .patch("/update/:id", Protected(true), musicsController.updateMusics);

export default musicsRouter;
