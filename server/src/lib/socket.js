import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV_VAR } from "./env.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV_VAR.CORS_ORIGIN],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is now connected with socket ${socket.id}`);
  } else {
    console.warn("Connection attempt without userId");
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      console.log(`User ${userId} has been removed from the online list`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
