import { Router } from "express";
import { createPost, getPostsController, getPostByIdController } from "../controllers/post.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postSchema } from "../validation/post.schema.js";

const router = Router();

router.post("/", authMiddleware, validate(postSchema), createPost);

router.get("/", getPostsController);      
router.get("/:id", getPostByIdController);

export default router;