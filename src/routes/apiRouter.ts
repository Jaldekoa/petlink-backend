import { Router } from "express";
import userRouter from "./userRouter";
import { verifyToken } from "@/middlewares";
import shelterMemberRouter from "./shelterMemberRouter";
import adoptionRouter from "./adoptionRouter";
import sponsorshipRouter from "./sponsorship.routes";
import notificationRouter from "./notification.routes";


const apiRouter = Router();

apiRouter.use(verifyToken);
apiRouter.use('/user', userRouter);
apiRouter.use('/shelter-members', shelterMemberRouter);
apiRouter.use('/adoption', adoptionRouter);
apiRouter.use('/sponsorship', sponsorshipRouter);
apiRouter.use('/notifications', notificationRouter)


export default apiRouter;
