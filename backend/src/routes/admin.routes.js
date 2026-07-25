import { Router } from "express";
import {
  createUserController,
  deleteCommentController,
  deletePostController,
  deleteUserController,
  getAdminController,
  getStatsController,
  getUsersController,
  updateUserController,
  updateUserRoleController,
} from "../controllers/admin.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../validation/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();
router.use(authMiddleware, requireRole("ADMIN"));

// GET
/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Obtener estadísticas globales del sitio (Solo ADMIN)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas generales obtenidas
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/stats", getStatsController);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Listar todos los usuarios del sistema (Solo ADMIN)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Crear un usuario desde el panel de administración (Solo ADMIN)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Nuevo Usuario Admin"
 *             email: "nuevo@admin.com"
 *             password: "Password123!"
 *             role: "ADMIN"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/users", getUsersController);

// POST
router.post("/users", validate(createUserSchema), createUserController);
/**
 * @swagger
 * /admin/comments:
 *   get:
 *     summary: Obtener todos los comentarios del sitio para moderación (Solo ADMIN)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista total de comentarios
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/comments", getAdminController);
// PATCH

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     summary: Modificar datos de un usuario (Solo ADMIN)
 *     tags: [Admin]
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
 *         description: Usuario actualizado
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   delete:
 *     summary: Eliminar un usuario (Solo ADMIN)
 *     tags: [Admin]
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
 *         description: Usuario eliminado
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.patch("/users/:id", validate(updateUserSchema), updateUserController);
router.delete("/users/:id", deleteUserController);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Cambiar el rol de un usuario (USER / ADMIN)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             role: "ADMIN"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.patch("/users/:id/role", updateUserRoleController);

// DELETE
/**
 * @swagger
 * /admin/posts/{id}:
 *   delete:
 *     summary: Eliminar cualquier post como moderación (Solo ADMIN)
 *     tags: [Admin]
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
 *         description: Post eliminado por el administrador
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.delete("/posts/:id", deletePostController);

/**
 * @swagger
 * /admin/comments/{id}:
 *   delete:
 *     summary: Eliminar cualquier comentario como moderación (Solo ADMIN)
 *     tags: [Admin]
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
 *         description: Comentario eliminado por el administrador
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.delete("/comments/:id", deleteCommentController);

export default router;
