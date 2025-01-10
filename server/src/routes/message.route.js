import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

export const MessageRouter = express.Router();

MessageRouter.post("/send/:receiverId", verifyToken, sendMessage);
MessageRouter.get("/all", verifyToken, getAllUsers);
MessageRouter.get("/:receiverId", verifyToken, getMessages);
