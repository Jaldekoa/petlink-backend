import { Router } from "express";
import * as likesController from "../controllers/likes.controller";
import { verifyToken } from "@/middlewares";

const likesRoutes = Router();

likesRoutes.get("/me", verifyToken, likesController.getMyLikes);
likesRoutes.post("/:animalId", verifyToken, likesController.toggle);
likesRoutes.get("/:animalId/count", verifyToken, likesController.getCount);

export default likesRoutes;