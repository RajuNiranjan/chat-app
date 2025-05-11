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

io.on("connection", (socket) => {
  console.log(`client connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

export { server, io, app };
