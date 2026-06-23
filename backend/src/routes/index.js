import { Router } from "express";
import authRoutes from "./auth.routes.js"
import {errorHandler} from "../middlewares/error.middleware.js"

const router = Router()

router.use("/auth",authRoutes)
router.get("/health",(req,res)=>res.json({ status: 'ok' }))
router.use(errorHandler)

export default router