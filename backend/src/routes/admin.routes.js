import { Router } from "express";
import { createUserController, deleteCommentController, deletePostController, deleteUserController, getStatsController, getUsersController, updateUserController, updateUserRoleController } from "../controllers/admin.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../validation/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();
router.use(authMiddleware, requireRole("ADMIN"));

// GET
router.get("/stats", getStatsController);
router.get("/users", getUsersController);

// POST
router.post("/users", validate(createUserSchema), createUserController);

// PATCH
router.patch("/users/:id", validate(updateUserSchema), updateUserController);
router.patch("/users/:id/role", updateUserRoleController);

// DELETE
router.delete("/users/:id", deleteUserController);
router.delete("/posts/:id", deletePostController);
router.delete("/comments/:id", deleteCommentController);

export default router;