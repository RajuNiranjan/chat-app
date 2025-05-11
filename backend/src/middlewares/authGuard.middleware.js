import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env.js";

export const authGuard = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth guard error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
