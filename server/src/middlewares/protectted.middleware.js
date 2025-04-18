import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";

const {
  ACCES_TOKEN_SECRET_EXP_IN,
  ACCES_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_EXP_IN,
  REFRESH_TOKEN_SECRET_KEY,
} = dotenvConfig;

export const Protected = (isProtected) => {
  return (req, res, next) => {
    if (!isProtected) {
      req.role = "USER";
      return next();
    }

    const accessToken = req.cookies.ACCES_TOKEN;
    const refreshToken = req.cookies.REFRESH_TOKEN;

    if (!accessToken && !refreshToken) {
      return res.status(401).send({ message: "Token not found" });
    }

    if (!accessToken) {
      try {
        const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);

        if (!data || !data.role || !data.id) {
          return res.status(401).send({ message: "Incorrect Token" });
        }

        const newAccessToken = jwt.sign(
          {
            id: data.id,
            email: data.email,
            role: data.role,
          },
          ACCES_TOKEN_SECRET_KEY,
          {
            expiresIn: +ACCES_TOKEN_SECRET_EXP_IN,
            algorithm: "HS256",
          }
        );

        const newRefreshToken = jwt.sign(
          {
            id: data.id,
            email: data.email,
            role: data.role,
          },
          REFRESH_TOKEN_SECRET_KEY,
          {
            expiresIn: +REFRESH_TOKEN_SECRET_EXP_IN,
            algorithm: "HS256",
          }
        );

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: +ACCES_TOKEN_SECRET_EXP_IN * 1000,
        });

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: +REFRESH_TOKEN_SECRET_EXP_IN * 1000,
        });

        return res.status(200).send({ message: "Token updated" });
      } catch (err) {
        return res.status(401).send({ message: "Your refreshToken is so old" });
      }
    }

    try {
      const decodedData = jwt.verify(accessToken, ACCES_TOKEN_SECRET_KEY);

      req.role = decodedData.role;
      req.user = {
        id: decodedData.id,
        email: decodedData.email,
      };

      next();
    } catch (err) {
      return res.status(401).send({ message: "Your token is not permitted" });
    }
  };
};
