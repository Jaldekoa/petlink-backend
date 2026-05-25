import { Router } from "express";
import * as sheltersController from "../controllers/shelters.controller";

const router = Router();

// Rutas públicas (cualquiera puede acceder)
router.get("/", sheltersController.getAll);
router.get("/:id", sheltersController.getById);

// Rutas protegidas (requieren autenticación)
router.post("/", sheltersController.create);
router.patch("/:id", sheltersController.update);
router.delete("/:id", sheltersController.remove);

export default router;