import { Router } from "express";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";
import uploadRoutes from "./upload.routes.js";
import categoryRoutes from "./category.routes.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/upload", uploadRoutes);
router.use("/categories", categoryRoutes);
router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use(errorHandler);

export default router;
