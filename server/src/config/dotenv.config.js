import { config } from "dotenv";

config();

export default {
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  ACCES_TOKEN_SECRET_KEY: process.env.ACCES_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  ACCES_TOKEN_SECRET_EXP_IN: process.env.ACCES_TOKEN_SECRET_EXP_IN,
  REFRESH_TOKEN_SECRET_EXP_IN: process.env.REFRESH_TOKEN_SECRET_EXP_IN,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};
