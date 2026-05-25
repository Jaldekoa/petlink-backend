import { Router } from "express";
import * as likesController from "../controllers/likes.controller";

const router = Router();

router.get("/me", likesController.getMyLikes);
router.post("/:animalId", likesController.toggle);
router.get("/:animalId/count", likesController.getCount);

export default router;