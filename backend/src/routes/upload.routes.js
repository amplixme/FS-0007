import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadImageMiddleware } from "../middlewares/upload.middleware.js";
import { uploadImageController } from "../controllers/upload.controllers.js";

const router = Router();
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Subir una imagen al servidor / Cloudinary
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida exitosamente, retorna la URL pública
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", authMiddleware, uploadImageMiddleware.single("image"), uploadImageController);

export default router;
