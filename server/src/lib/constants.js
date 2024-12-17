import dotenv from "dotenv";
dotenv.config();

export const ENV_VAR = {
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DB_URI: process.env.DB_URI,
};
