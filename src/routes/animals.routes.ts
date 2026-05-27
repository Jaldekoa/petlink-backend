import { Router } from "express";
import * as animalsController from "../controllers/animals.controller";
import { requireRole, verifyToken } from "@/middlewares/auth.middleware";
import { user_role } from "@prisma/client";

const animalsRoutes = Router();

animalsRoutes.get("/", verifyToken, animalsController.getAll);
animalsRoutes.get("/:id", verifyToken, animalsController.getById);
animalsRoutes.post("/", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalsController.create);
animalsRoutes.patch("/:id", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalsController.update);
animalsRoutes.delete("/:id", verifyToken, requireRole(user_role.administrador, user_role.trabajador), animalsController.remove);

export default animalsRoutes;