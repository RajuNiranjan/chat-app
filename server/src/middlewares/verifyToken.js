import jwt from "jsonwebtoken";
import { ENV_VAR } from "../utils/env.js";
import { ErrorMiddleware } from "./error.middleware.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return ErrorMiddleware(new Error("Unauthorized"));

  jwt.verify(token, ENV_VAR.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return ErrorMiddleware(err);
    req.userId = decoded.userId;
    next();
  });
};
