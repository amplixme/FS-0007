import { Router } from "express";

import {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controllers.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", authMiddleware, requireRole("ADMIN"), createCategoryController);

router.get("/", getCategoriesController);

router.put("/:id", authMiddleware, requireRole("ADMIN"), updateCategoryController);

router.delete("/:id", authMiddleware, requireRole("ADMIN"), deleteCategoryController);

export default router;
