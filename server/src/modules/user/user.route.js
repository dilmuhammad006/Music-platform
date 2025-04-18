import { Router } from "express";
const userRouter = Router();
import userController from "./user.controller.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { LoginSchema, RegisterSchema } from "./dtos/user.dtos.js";
import { Protected } from "../../middlewares/protectted.middleware.js";

userRouter
  .get("/all",Protected(true), userController.getAllUsers)
  .post(
    "/register",
    Protected(false),
    validationMiddleware(RegisterSchema),
    userController.register
  )
  .post("/login", Protected(false), validationMiddleware(LoginSchema), userController.login)
  .post("/logout",Protected(false), userController.logout);

export default userRouter;
