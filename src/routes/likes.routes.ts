import { Router } from "express";
import * as likesController from "../controllers/likes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, likesController.getMyLikes);
router.post("/:animalId", authMiddleware, likesController.toggle);
router.get("/:animalId/count", likesController.getCount);

export default router;