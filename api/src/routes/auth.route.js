import express from "express";
import {
  Login,
  Me,
  Register,
  UpdateProfile,
} from "../controllers/auth.controller.js";
import { validateToken } from "../utils/verifyToken.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.get("/me", validateToken, Me);
AuthRouter.patch("/update-profile", validateToken, UpdateProfile);
