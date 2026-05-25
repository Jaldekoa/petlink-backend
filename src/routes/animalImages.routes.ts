import { Router } from "express";
import * as animalImagesController from "../controllers/animalImages.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router({ mergeParams: true }); // importante para heredar :animalId

router.get("/", animalImagesController.getByAnimal);
router.post("/", authMiddleware, animalImagesController.add);
router.delete("/:id", authMiddleware, animalImagesController.remove);
router.patch("/:id/main", authMiddleware, animalImagesController.setMain);

export default router;