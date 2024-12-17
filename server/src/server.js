import express from "express";
import "./lib/db.js";
import { ENV_VAR } from "./lib/constants.js";
import { AuthRouter } from "./routes/auth.route.js";

const app = express();

app.use(express.json());

const { PORT } = ENV_VAR;

app.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to chat-app" })
);
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
