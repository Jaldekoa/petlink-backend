import { Router } from "express";
import userRouter from "./userRouter";
import { verifyToken } from "@/middlewares";
import shelterMemberRouter from "./shelterMemberRouter";
import adoptionRouter from "./adoptionRouter";


const apiRouter = Router();

apiRouter.use(verifyToken);
apiRouter.use('/user', userRouter);
apiRouter.use('/shelter-members', shelterMemberRouter);
apiRouter.use('/adoption', adoptionRouter);


export default apiRouter;
