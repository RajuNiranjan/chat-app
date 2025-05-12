import express from "express";
import http from "http";
import { Server } from "socket.io";
import { FRONT_END_URI } from "./env.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONT_END_URI,
    methods: ["GET", "POST"],
  },
});

let userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  console.log(`client connected ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`client disconnected ${socket.id}`);
    if (userId) {
      delete userSocketMap[userId];
    }
  });
});

export { server, io, app };
