import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";

const tokenMiddleWare = (user, res) => {
  const ACCES_TOKEN = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    dotenvConfig.ACCES_TOKEN_SECRET_KEY,
    {
      expiresIn: dotenvConfig.ACCES_TOKEN_SECRET_EXP_IN,
      algorithm: "HS256",
    }
  );

  const REFRESH_TOKEN = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    dotenvConfig.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: dotenvConfig.REFRESH_TOKEN_SECRET_EXP_IN,
      algorithm: "HS256",
    }
  );

  res.cookie("ACCES_TOKEN", ACCES_TOKEN, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

};

export default tokenMiddleWare;
