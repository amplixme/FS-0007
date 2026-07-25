import { Router } from "express";
import {
  createPost,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
} from "../controllers/post.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postSchema } from "../validation/post.schema.js";

const router = Router();


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts obtenida
 *   post:
 *     summary: Crear nuevo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Mi primer post"
 *             content: "Contenido del post..."
 *             published: true
 *             categoryIds: ["cat_123"]
 *     responses:
 *       201:
 *         description: Post creado
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", authMiddleware, validate(postSchema), createPost);
router.get("/", getPostsController);


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Actualizar post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post actualizado
 *   delete:
 *     summary: Eliminar post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post eliminado
 */
router.get("/:id", getPostByIdController);

router.put("/:id", authMiddleware, validate(postSchema), updatePostController);

router.delete("/:id", authMiddleware, deletePostController);

export default router;
