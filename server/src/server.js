import { app, io, server } from "./lib/socket.js";
import "./config/db.js";
import { ENV_VAR } from "./utils/env.js";
import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/auth.route.js";

const PORT = ENV_VAR.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ENV_VAR.CORS_ORIGIN,
    withCredentials: true,
  })
);

app.use("/api/auth", AuthRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
