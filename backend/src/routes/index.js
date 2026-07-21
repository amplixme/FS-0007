import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";
import uploadRoutes from "./upload.routes.js";
import categoryRoutes from "./category.routes.js";
import postCommentRoutes from "./postComment.routes.js";
import commentRoutes from "./comment.routes.js";
import userRoutes from "./user.routes.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const router = Router();

router.use("/admin", adminRoutes);

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/posts", postCommentRoutes);
router.use("/comments", commentRoutes);
router.use("/upload", uploadRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use(errorHandler);

export default router;
