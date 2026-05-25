import { Router } from "express";
import * as sheltersController from "../controllers/shelters.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Rutas públicas (cualquiera puede acceder)
router.get("/", sheltersController.getAll);
router.get("/:id", sheltersController.getById);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, sheltersController.create);
router.patch("/:id", authMiddleware, sheltersController.update);
router.delete("/:id", authMiddleware, sheltersController.remove);

export default router;