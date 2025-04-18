import { Router } from "express";
const userRouter = Router();
import userController from "./user.controller.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { LoginSchema, RegisterSchema } from "../dtos/user.dtos.js";

userRouter
  .get("/all", userController.getAllUsers)
  .post(
    "/register",
    validationMiddleware(RegisterSchema),
    userController.register
  )
  .post("/login", validationMiddleware(LoginSchema), userController.login)
  .post("/logout", userController.logout);

export default userRouter;
