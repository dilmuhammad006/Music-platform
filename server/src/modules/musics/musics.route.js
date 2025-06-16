import { Router } from "express";
import musicsController from "./musics.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { uploadMusic } from "../../config/multer.config.js";
const musicsRouter = Router();

musicsRouter
  .get("/all", Protected(true), musicsController.getAllMusics)
  .post(
    "/add",
    authMiddleware,
    checkRole(["ADMIN"]),
    Protected(true),
    uploadMusic.single("musicFile"),
    musicsController.addMusics
  )
  .delete(
    "/delete/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    Protected(true),
    musicsController.deleteMusics
  )
  .get("/get/:id", Protected(true), musicsController.getMusicsById)
  .patch(
    "/update/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    Protected(true),
    musicsController.updateMusics
  );

export default musicsRouter;
