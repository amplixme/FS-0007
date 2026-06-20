import { Router } from "express";
import { registerUser,loginUser } from "./auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema,loginSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login",validate(loginSchema), loginUser)

export default router;