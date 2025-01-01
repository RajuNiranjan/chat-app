import mongoose from "mongoose";
import { ENV_VAR } from "../utils/envVar.js";

const ConnectDB = async () => {
  try {
    await mongoose
      .connect(ENV_VAR.DB_URI)
      .then(() => console.log("server connected to data base"))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

ConnectDB();
