import { Router } from "express";
import * as paymentHistoryController from "../controllers/paymentHistory.controller";
import { requireRole, verifyToken } from "@/middlewares";
import { user_role } from "@prisma/client";

const router = Router();

router.get("/sponsorship/:sponsorshipId", verifyToken, requireRole(user_role.administrador, user_role.trabajador), paymentHistoryController.getBySponsorship);
router.post("/sponsorship/:sponsorshipId", verifyToken, requireRole(user_role.administrador, user_role.trabajador), paymentHistoryController.create);
router.get("/:id", verifyToken, paymentHistoryController.getById);

export default router;