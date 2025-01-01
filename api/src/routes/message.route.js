import express from "express";
import { validateToken } from "../utils/verifyToken.js";
import {
  GetAllUser,
  GetConversation,
  SendMessage,
} from "../controllers/message.controller.js";

export const MessageRouter = express.Router();

MessageRouter.get("/all-users", validateToken, GetAllUser);
MessageRouter.get("/:id", validateToken, GetConversation);
MessageRouter.post("/send/:id", validateToken, SendMessage);
