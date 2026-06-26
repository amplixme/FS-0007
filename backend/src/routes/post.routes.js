import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postSchema } from "../validation/post.schema.js";

const router = Router();

router.post("/", authMiddleware, validate(postSchema), createPost);


export default router;