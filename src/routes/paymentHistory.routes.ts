import { Router } from "express";
import * as paymentHistoryController from "../controllers/paymentHistory.controller";

const router = Router();

router.get("/sponsorship/:sponsorshipId", paymentHistoryController.getBySponsorship);
router.post("/sponsorship/:sponsorshipId", paymentHistoryController.create);
router.get("/:id", paymentHistoryController.getById);

export default router;