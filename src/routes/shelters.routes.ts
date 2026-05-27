import { Router } from "express";
import * as sheltersController from "../controllers/shelters.controller";
import { requireRole, verifyToken } from "@/middlewares/auth.middleware";
import { user_role } from "@prisma/client";

const sheltersRoutes = Router();

sheltersRoutes.get("/", verifyToken, sheltersController.getAll);
sheltersRoutes.get("/:id", verifyToken, sheltersController.getById);

sheltersRoutes.post("/", verifyToken, requireRole(user_role.administrador, user_role.trabajador), sheltersController.create);
sheltersRoutes.patch("/:id", verifyToken, requireRole(user_role.administrador, user_role.trabajador), sheltersController.update);
sheltersRoutes.delete("/:id", verifyToken, requireRole(user_role.administrador, user_role.trabajador), sheltersController.remove);

export default sheltersRoutes;