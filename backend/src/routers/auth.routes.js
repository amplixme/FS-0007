import { Router } from "express";
import { registerUser } from "./auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import Joi from "joi";

const router = Router();

const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "El email debe ser válido",
        "any.required": "El email es requerido",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "any.required": "La contraseña es requerida",
    }),
    name: Joi.string().min(2).required().messages({
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "any.required": "El nombre es requerido",
    }),
});

router.post("/register", validate(registerSchema), registerUser);

export default router;