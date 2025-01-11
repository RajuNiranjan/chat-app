import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkAuth,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.put("/update-profile", protectRoute, updateProfile);
AuthRouter.get("/check", protectRoute, checkAuth);
