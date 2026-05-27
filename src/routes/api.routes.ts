import { Router } from "express";
import userRouter from "./user.routes";
import { verifyToken } from "@/middlewares";
import shelterMemberRouter from "./shelterMember.routes";
import adoptionRouter from "./adoption.routes";
import sponsorshipRouter from "./sponsorship.routes";
import notificationRouter from "./notification.routes";
import likesRoutes from "./likes.routes";
import userRoutes from "./user.routes";
import shelterMemberRoutes from "./shelterMember.routes";
import adoptionRoutes from "./adoption.routes";
import sponsorshipRoutes from "./sponsorship.routes";
import animalsRoutes from "./animals.routes";
import paymentHistoryRoutes from "./paymentHistory.routes";
import animalImagesRoutes from "./animalImages.routes";
import sheltersRoutes from "./shelters.routes";
import notificationRoutes from "./notification.routes";


const apiRouter = Router();

apiRouter.use('/user', userRoutes);
apiRouter.use('/shelter-members', shelterMemberRoutes);
apiRouter.use('/adoption', adoptionRoutes);
apiRouter.use('/sponsorship', sponsorshipRoutes);
apiRouter.use('/notifications', notificationRoutes);
apiRouter.use("/api/shelters", sheltersRoutes);
apiRouter.use("/api/animals", animalsRoutes);
apiRouter.use("/api/animals/:animalId/images", animalImagesRoutes);
apiRouter.use("/api/likes", likesRoutes);
apiRouter.use("/api/payment-history", paymentHistoryRoutes);


export default apiRouter;
