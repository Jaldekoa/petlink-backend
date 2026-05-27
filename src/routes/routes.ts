import { Router } from "express";
import apiRouter from "./api.routes";
import authRouter from "./auth.routes";


const router = Router();
router.use("/auth", authRouter);
router.use("/", apiRouter);

export default router;
