import { Router } from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  getUser,
} from "../controllers/auth.controller.js";
import { authGuard } from "../middlewares/authGuard.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", authGuard, checkAuth);
authRouter.get("/users", authGuard, getUser);
