import { Router } from "express";
import * as animalsController from "../controllers/animals.controller";

const router = Router();

router.get("/", animalsController.getAll);
router.get("/:id", animalsController.getById);
router.post("/", animalsController.create);
router.patch("/:id", animalsController.update);
router.delete("/:id", animalsController.remove);

export default router;