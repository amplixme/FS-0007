import { Router } from "express";
import authRoutes from "./auth.routes.js"
import postRoutes from "./post.routes.js"
import {errorHandler} from "../middlewares/error.middleware.js"

const router = Router()

router.use("/auth",authRoutes)
router.use("/posts", postRoutes);
router.get("/health",(req,res)=>res.json({ status: 'ok' }))
router.use(errorHandler)

export default router