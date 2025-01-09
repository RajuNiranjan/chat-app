import { Server } from "socket.io";
import { ENV_VAR } from "../utils/env.js";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV_VAR.CORS_ORIGIN,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

export { io, server, app };
