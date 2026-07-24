import { Router } from "express";
import {
  updateCommentController,
  deleteCommentController,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.put("/:id", authMiddleware, updateCommentController);
router.delete("/:id", authMiddleware, deleteCommentController);

export default router;
