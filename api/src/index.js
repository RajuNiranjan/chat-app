import "./utils/config.js";
import { ENV_VAR } from "./utils/env.js";
import { app, io, server } from "./lib/socket.js";
import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/auth.route.js";
import { MessageRouter } from "./routes/message.route.js";

const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(cors({ origin: ENV_VAR.CORS_ORIGIN }));

app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
