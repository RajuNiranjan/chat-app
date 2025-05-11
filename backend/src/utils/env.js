import dotenv from "dotenv";
dotenv.config();

export const {
  DB_URI,
  COLLECTION_NAME,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONT_END_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
