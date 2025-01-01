import jwt from "jsonwebtoken";
import { ENV_VAR } from "./envVar.js";

export const genToken = (userId) => {
  const token = jwt.sign({ userId }, ENV_VAR.JWT_SECRET_KEY, {
    expiresIn: ENV_VAR.JWT_EXPIRES_IN,
  });

  return token;
};
