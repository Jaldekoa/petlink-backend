import { Router } from "express";
import * as paymentHistoryController from "../controllers/paymentHistory.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/sponsorship/:sponsorshipId", authMiddleware, paymentHistoryController.getBySponsorship);
router.post("/sponsorship/:sponsorshipId", authMiddleware, paymentHistoryController.create);
router.get("/:id", authMiddleware, paymentHistoryController.getById);

export default router;