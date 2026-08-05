import { Router } from "express";
import {
  createCommentController,
  getCommentsByPostController,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { commentSchema } from "../validation/comment.schema.js";

const router = Router();


/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Obtener comentarios de un post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios del post
 *   post:
 *     summary: Crear comentario en un post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             content: "Excelente artículo!"
 *     responses:
 *       201:
 *         description: Comentario creado
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/:postId/comments", authMiddleware, validate(commentSchema), createCommentController);

router.get("/:postId/comments", getCommentsByPostController);

export default router;
