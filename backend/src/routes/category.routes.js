import { Router } from "express";

import {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controllers.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida
 *   post:
 *     summary: Crear una categoría (Solo ADMIN)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Tecnología"
 *     responses:
 *       201:
 *         description: Categoría creada
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

router.post("/", authMiddleware, requireRole("ADMIN"), createCategoryController);

router.get("/", getCategoriesController);


/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar categoría (Solo ADMIN)
 *     tags: [Categories]
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
 *         description: Categoría actualizada
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   delete:
 *     summary: Eliminar categoría (Solo ADMIN)
 *     tags: [Categories]
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
 *         description: Categoría eliminada
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/:id", authMiddleware, requireRole("ADMIN"), updateCategoryController);

router.delete("/:id", authMiddleware, requireRole("ADMIN"), deleteCategoryController);

export default router;
