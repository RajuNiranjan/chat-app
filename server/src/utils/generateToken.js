import jwt from "jsonwebtoken";
import { ENV_VAR } from "./env.js";

export const generateToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, ENV_VAR.JWT_SECRET_KEY, {
    expiresIn: ENV_VAR.JWT_EXPIRES_IN,
  });
  return token;
};
