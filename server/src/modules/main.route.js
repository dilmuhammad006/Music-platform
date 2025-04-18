import { Router } from "express";
import userRouter from "./user/user.route.js";
import musicianRouter from "./musician/musician.route.js";
import musicsRouter from "./musics/musics.route.js";
import likedRouter from "./liked/liked.route.js";

const router = Router();
router.use("/users", userRouter);
router.use("/musicians", musicianRouter);
router.use("/musics", musicsRouter);
router.use("/liked", likedRouter);

export default router;
