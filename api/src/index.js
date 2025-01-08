import "./utils/config.js";
import { ENV_VAR } from "./utils/env.js";
import { app, io, server } from "./lib/socket.js";
import express from "express";
import cors from "cors";

const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(cors({ origin: ENV_VAR.CORS_ORIGIN }));

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
