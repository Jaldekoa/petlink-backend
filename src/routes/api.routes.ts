import { Router } from "express";
import userRouter from "./user.routes";
import { verifyToken } from "@/middlewares";
import shelterMemberRouter from "./shelterMember.routes";
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
