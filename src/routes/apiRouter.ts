import { Router } from "express";
import userRouter from "./userRouter";
import { verifyToken } from "@/middlewares";


const apiRouter = Router();

apiRouter.use(verifyToken);
apiRouter.use('/user', userRouter);


export default apiRouter;
