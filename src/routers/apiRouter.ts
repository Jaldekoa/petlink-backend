import { Router } from "express";
import userRouter from "./userRouter";


const apiRouter = Router();

apiRouter.use('/user', userRouter);


export default apiRouter;
