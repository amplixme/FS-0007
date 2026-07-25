import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validation/auth.schema.js";

const router = Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Test"
 *             email: "test@example.com"
 *             password: "Password123!"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 */
router.post("/register", validate(registerSchema), registerUser);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "test@example.com"
 *             password: "Password123!"
 *     responses:
 *       200:
 *         description: Login exitoso, retorna Token JWT
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/login", validate(loginSchema), loginUser);

export default router;
