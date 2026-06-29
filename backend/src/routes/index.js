import { Router } from "express";
import authRoutes from "./auth.routes.js"
import postRoutes from "./post.routes.js"
import {errorHandler} from "../middlewares/error.middleware.js"
import uploadRoutes from "./upload.routes.js";

const router = Router()

router.use("/auth",authRoutes)
router.use("/posts", postRoutes);
router.use("/upload", uploadRoutes);
router.get("/health",(req,res)=>res.json({ status: 'ok' }))
router.use(errorHandler)

export default router