import jwt from "jsonwebtoken";
import { ENV_VAR } from "./constants.js";

export const genToken = (userId) => {
  const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = ENV_VAR;

  const payload = { userId };

  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
