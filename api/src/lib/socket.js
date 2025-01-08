import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

io.on("connection", (socket) => {
  console.log("a user connection", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

export { io, server, app };
