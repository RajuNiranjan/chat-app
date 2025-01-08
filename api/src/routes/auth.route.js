import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/auth.controller.js";
export const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/profile", verifyToken, getUserProfile);
