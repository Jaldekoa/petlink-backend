import { Router } from "express";
import userRouter from "./userRouter";
import { verifyToken } from "@/middlewares";
import shelterMemberRouter from "./shelterMemberRouter";


const apiRouter = Router();

apiRouter.use(verifyToken);
apiRouter.use('/user', userRouter);
apiRouter.use('/shelter-members', shelterMemberRouter);


export default apiRouter;
