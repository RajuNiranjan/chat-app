import { app, server } from "./utils/socket.js";
import express from "express";
import cors from "cors";
import "./config/database.js";
import cookieParser from "cookie-parser";
import { FRONT_END_URI, PORT } from "./utils/env.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { authRouter } from "./routers/auth.router.js";
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: FRONT_END_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(errorHandler);

app.get("/test", (req, res) => {
  res.json({ message: "welcome to MERN stack Chat Application" });
});

app.use("/api/v1/auth", authRouter);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
