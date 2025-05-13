import mongoose from "mongoose";
import { COLLECTION_NAME, DB_URI } from "../utils/env.js";

const connectDB = async () => {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI);
      console.log("server connected to data base");
    } else {
      throw new Error("DB_URI is not defined");
    }
  } catch (error) {
    console.log(error);
  }
};

connectDB();
