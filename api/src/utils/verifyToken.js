import jwt from "jsonwebtoken";
import { ENV_VAR } from "./envVar.js";

export const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);

    req.userId = decodedToken;

    next();
  } catch (error) {
    console.error("Token validation error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
