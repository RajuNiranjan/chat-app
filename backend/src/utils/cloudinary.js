import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
} from "./env.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export default cloudinary;
