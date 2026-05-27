import { Router } from "express";
import * as animalImagesController from "../controllers/animalImages.controller";
import { user_role } from "@prisma/client";
import { requireRole, verifyToken } from "@/middlewares";

const router = Router({ mergeParams: true });

router.get("/", verifyToken, animalImagesController.getByAnimal);
router.post("/", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalImagesController.add);
router.delete("/:id", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalImagesController.remove);
router.patch("/:id/main", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalImagesController.setMain);

export default router;