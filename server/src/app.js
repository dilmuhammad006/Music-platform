import router from "./modules/main.route.js";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.handler.middleware.js";
import cors from "cors";
import path from "path";
import dotenvConfig from "./config/dotenv.config.js";
const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(process.cwd(), "..", "/uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/api", router);

app.all("/splat", (req, res) => {
  res.status(404).send({
    message: "This page not found",
  });
});

app.use(errorHandler);

export default app;
