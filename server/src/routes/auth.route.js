import express from "express";
import { LogIn, LogOut, Register } from "../controllers/auth.controller.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", LogIn);
AuthRouter.post("/logout", LogOut);
