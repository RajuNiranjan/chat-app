import mongoose from "mongoose";
import { ENV_VAR } from "./env.js";

const ConnectDB = async () => {
  const DB_URI = ENV_VAR.DB_URI;
  if (!DB_URI) {
    console.error("Database URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("server connected to database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

ConnectDB();
