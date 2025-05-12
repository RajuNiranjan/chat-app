import dotenv from "dotenv";
dotenv.config();

export const {
  DB_URI,
  COLLECTION_NAME,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONT_END_URI,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
} = process.env;
