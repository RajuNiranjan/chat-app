import mongoose from "mongoose";
import { ENV_VAR } from "./constants.js";

const ConnectDB = async () => {
  try {
    const { DB_URI } = ENV_VAR;

    if (!DB_URI) {
      console.log("Invalid Database URI");
      return;
    }

    await mongoose.connect(DB_URI);
    console.log("Server connected to the database successfully");
  } catch (error) {
    console.error("Error while connecting to the database:", error.message);
  }
};

ConnectDB();
