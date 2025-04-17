import { Router } from "express";
import userRouter from "./user/user.route.js";
import musicianRouter from "./musician/musician.route.js";

const router = Router();
router.use("/users", userRouter);
router.use("/musicians", musicianRouter);

export default router;
