import express from "express";
import {
  GetMe,
  LoginUser,
  RegisterUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", LoginUser);
AuthRouter.get("/me", verifyToken, GetMe);
