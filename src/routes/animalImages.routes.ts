import { Router } from "express";
import * as animalImagesController from "../controllers/animalImages.controller";

const router = Router({ mergeParams: true }); // importante para heredar :animalId

router.get("/", animalImagesController.getByAnimal);
router.post("/", animalImagesController.add);
router.delete("/:id", animalImagesController.remove);
router.patch("/:id/main", animalImagesController.setMain);

export default router;