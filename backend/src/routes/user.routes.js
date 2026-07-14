import { Router } from "express";
import {
  getPublicProfileController,
  updateProfileController,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validation/user.schema.js";

const router = Router();

router.get("/:id", getPublicProfileController);

router.put(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfileController,
);

export default router;
