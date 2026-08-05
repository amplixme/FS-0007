import { Router } from "express";
import {
  getPublicProfileController,
  updateProfileController,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validation/user.schema.js";

const router = Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener el perfil público de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfil de usuario encontrado
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", getPublicProfileController);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Actualizar el perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Santy Modificado"
 *             bio: "Desarrollador Full Stack"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.put("/me", authMiddleware, validate(updateProfileSchema), updateProfileController);

export default router;
