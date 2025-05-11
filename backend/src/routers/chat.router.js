import { Router } from "express";
import {
  getConversation,
  sendMessage,
} from "../controllers/chat.controller.js";
import { authGuard } from "../middlewares/authGuard.middleware.js";

export const chatRouter = Router();

chatRouter.get("/conversation/:receiverId", authGuard, getConversation);
chatRouter.post("/send/:receiverId", authGuard, sendMessage);
