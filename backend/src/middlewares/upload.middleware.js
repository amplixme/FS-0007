import multer from "multer";
import CustomError from "../utils/customError.js";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new CustomError(400, "Formato de imagen no permitido. Solo se aceptan JPG, PNG y WEBP.")
    );
  }

  callback(null, true);
};

export const uploadImageMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});
