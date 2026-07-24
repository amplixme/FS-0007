import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadImageMiddleware } from "../middlewares/upload.middleware.js";
import { uploadImageController } from "../controllers/upload.controllers.js";

const router = Router();

router.post("/", authMiddleware, uploadImageMiddleware.single("image"), uploadImageController);

export default router;
