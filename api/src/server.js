import express from "express";
import cors from "cors";
import { ENV_VAR } from "./utils/envVar.js";
import "./config/db.js";
import { AuthRouter } from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ENV_VAR.CORS_ORIGIN,
  })
);

app.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to chat-app" })
);

app.use("/api/auth", AuthRouter);

app.listen(
  ENV_VAR.PORT,
  console.log(`server running in port no: ${ENV_VAR.PORT} `)
);
