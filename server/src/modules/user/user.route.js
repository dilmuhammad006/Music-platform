import { Router } from "express";
const userRouter = Router();
import userController from "./user.controller.js";

userRouter
  .get("/all", userController.getAllUsers)
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout", userController.logout);

export default userRouter;
