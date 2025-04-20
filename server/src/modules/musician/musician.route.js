import { Router } from "express";
import musicianController from "./musician.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const musicianRouter = Router();

musicianRouter
  .get(
    "/all",
    Protected(true),
    authMiddleware,
    musicianController.getAllMusicians
  )
  .post(
    "/add",
    checkRole(["ADMIN"]),
    Protected(true),
    authMiddleware,
    musicianController.addMusicians
  );

export default musicianRouter;
