import { Router } from "express";
import * as animalsController from "../controllers/animals.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", animalsController.getAll);
router.get("/:id", animalsController.getById);
router.post("/", authMiddleware, animalsController.create);
router.patch("/:id", authMiddleware, animalsController.update);
router.delete("/:id", authMiddleware, animalsController.remove);

export default router;