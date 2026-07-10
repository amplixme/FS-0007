import { Router } from "express";
import { createCommentController } from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { commentSchema } from "../validation/comment.schema.js";

const router = Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  validate(commentSchema),
  createCommentController,
);

export default router;
