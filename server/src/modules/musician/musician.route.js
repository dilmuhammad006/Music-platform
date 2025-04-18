import { Router } from "express";
import musicianController from "./musician.controller.js";
import { Protected } from "../../middlewares/protectted.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
const musicianRouter = Router();

musicianRouter
  .get(
    "/all",
    checkRole(["ADMIN"]),
    Protected(true),
    musicianController.getAllMusicians
  )
  .post(
    "/add",
    checkRole(["ADMIN"]),
    Protected(true),
    musicianController.addMusicians
  );

export default musicianRouter;
