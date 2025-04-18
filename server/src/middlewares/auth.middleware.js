import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";

const ACCES_TOKEN_SECRET_KEY = dotenvConfig.ACCES_TOKEN_SECRET_KEY;

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.ACCES_TOKEN || req.headers?.authorization;

  if (!token) {
    return res.status(401).send({
      message: "You don't have any token for access",
    });
  }

  try {
    const decoded = jwt.verify(token, ACCES_TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("ACCES_TOKEN");
    return res.status(403).send({
      message: "Invalid or expired token",
    });
  }
};
