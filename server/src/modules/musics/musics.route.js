import { Router } from "express";
import musicsController from "./musics.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
const musicsRouter = Router();

musicsRouter
  .get("/all", Protected(true), musicsController.getAllMusics)
  .post(
    "/add",
    checkRole(["ADMIN"]),
    Protected(true),
    musicsController.addMusics
  )
  .delete(
    "/delete/:id",
    checkRole(["ADMIN"]),
    Protected(true),
    musicsController.deleteMusics
  )
  .get("/get/:id", Protected(true), musicsController.getMusicsById)
  .patch(
    "/update/:id",
    checkRole(["ADMIN"]),
    Protected(true),
    musicsController.updateMusics
  );

export default musicsRouter;
