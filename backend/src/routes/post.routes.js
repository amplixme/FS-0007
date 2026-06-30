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

router.post("/", authMiddleware, validate(postSchema), createPost);

router.get("/", getPostsController);
router.get("/:id", getPostByIdController);

router.put("/:id", authMiddleware, validate(postSchema), updatePostController);

router.delete("/:id", authMiddleware, deletePostController);

export default router;
