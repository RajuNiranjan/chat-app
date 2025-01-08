import express from "express";
import {
  sendMessage,
  getUsers,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const MessageRouter = express.Router();

MessageRouter.post("/send/:receiverId", verifyToken, sendMessage);
MessageRouter.get("/users", verifyToken, getUsers);
MessageRouter.get("/:receiverId", verifyToken, getMessages);
