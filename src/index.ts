import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

// === RUTAS (mañana se descomentan según se vayan creando) ===
// import authRoutes from "./routes/auth.routes";
// import usersRoutes from "./routes/users.routes";
// import animalsRoutes from "./routes/animals.routes";
// import animalImagesRoutes from "./routes/animalImages.routes";
// import likesRoutes from "./routes/likes.routes";
// import sheltersRoutes from "./routes/shelters.routes";
// import shelterMembersRoutes from "./routes/shelterMembers.routes";
// import adoptionsRoutes from "./routes/adoptions.routes";
// import sponsorshipsRoutes from "./routes/sponsorships.routes";
// import paymentHistoryRoutes from "./routes/paymentHistory.routes";
// import notificationsRoutes from "./routes/notifications.routes";

const app = express();

// === MIDDLEWARES ===
app.use(cors());
app.use(express.json());

// === RUTA DE PRUEBA ===
app.get("/", (req: Request, res: Response) => {
    res.send("API funcionando en navegador");
});

// === RUTAS DE LA API (mañana se descomentan) ===
// app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/animals", animalsRoutes);
// app.use("/api/animal-images", animalImagesRoutes);
// app.use("/api/likes", likesRoutes);
// app.use("/api/shelters", sheltersRoutes);
// app.use("/api/shelter-members", shelterMembersRoutes);
// app.use("/api/adoptions", adoptionsRoutes);
// app.use("/api/sponsorships", sponsorshipsRoutes);
// app.use("/api/payment-history", paymentHistoryRoutes);
// app.use("/api/notifications", notificationsRoutes);

// === SERVER ===
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});