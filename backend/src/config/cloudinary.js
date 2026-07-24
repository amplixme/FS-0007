import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_URL) {
  throw new Error("Falta configurar CLOUDINARY_URL en el archivo .env");
}

cloudinary.config({
  secure: true,
});

export default cloudinary;
