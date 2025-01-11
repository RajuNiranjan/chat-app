import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

export const MessageRouter = express.Router();

MessageRouter.get("/users", protectRoute, getUsersForSidebar);
MessageRouter.get("/:id", protectRoute, getMessages);

MessageRouter.post("/send/:id", protectRoute, sendMessage);
