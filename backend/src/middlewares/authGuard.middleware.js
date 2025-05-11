import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env.js";

export const authGuard = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error("Unauthorized");
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
