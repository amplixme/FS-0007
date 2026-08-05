import { Prisma } from "../repository/Prisma/generated/client.ts";
import { error } from "../utils/response.js";
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return error(res, "La imagen no puede superar los 5 MB.", 400);
    }

    return error(res, "Error al subir la imagen.", 400);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return error(res, "The resource already exists.", 409);

      case "P2025":
        return error(res, "Not found.", 404);

      default:
        return error(res, err.message, 500);
    }
  }

  return error(res, err.message || "Internal Server Error.", err.status || 500);
};
