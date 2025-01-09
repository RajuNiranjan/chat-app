import mongoose from "mongoose";
import { ENV_VAR } from "../utils/env.js";
import { ErrorMiddleware } from "../middlewares/error.middleware.js";

const ConnectDB = async (req, res, next) => {
  if (!ENV_VAR.DB_URI) return;
  try {
    await mongoose
      .connect(ENV_VAR.DB_URI)
      .then(() => console.log("server connected to Data base"));
  } catch (error) {
    console.log(error);
    next(ErrorMiddleware(error));
  }
};
ConnectDB();
