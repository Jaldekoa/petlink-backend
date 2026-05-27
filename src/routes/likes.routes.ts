import { Router } from "express";
import * as likesController from "../controllers/likes.controller";
import { verifyToken } from "@/middlewares";

const router = Router();

router.get("/me", verifyToken, likesController.getMyLikes);
router.post("/:animalId", verifyToken, likesController.toggle);
router.get("/:animalId/count", verifyToken, likesController.getCount);

export default router;