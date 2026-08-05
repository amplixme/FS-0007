import cloudinary from "../config/cloudinary.js";
import CustomError from "../utils/customError.js";

const uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "fs-0007",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const uploadImageController = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new CustomError(400, "Debes enviar una imagen."));
    }

    const result = await uploadBufferToCloudinary(req.file.buffer);

    return res.status(201).json({
      url: result.secure_url,
    });
  } catch (err) {
    next(err);
  }
};
