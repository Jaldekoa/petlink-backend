import { Router } from "express";
import apiRouter from "./apiRouter";
import authRouter from "./authRouter";


const router = Router();
router.use("/auth", authRouter);
router.use("/", apiRouter);

export default router;
