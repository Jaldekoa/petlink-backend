import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routers/routes";

// === RUTAS IMPLEMENTADAS ===
import sheltersRoutes from "./routes/shelters.routes";
import animalsRoutes from "./routes/animals.routes";
import animalImagesRoutes from "./routes/animalImages.routes";
import likesRoutes from "./routes/likes.routes";
import paymentHistoryRoutes from "./routes/paymentHistory.routes";

// Fix para serializar BigInt a JSON (necesario con Prisma + PostgreSQL)
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

const app = express();

// === MIDDLEWARES ===
app.use(cors());
app.use(express.json());

// === RUTA DE PRUEBA ===
app.use("/", router);


// === RUTAS DE SHELTERS, ANIMALS, LIKES Y PAYMENT-HISTORY ===
app.use("/api/shelters", sheltersRoutes);
app.use("/api/animals", animalsRoutes);
app.use("/api/animals/:animalId/images", animalImagesRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/payment-history", paymentHistoryRoutes);

// === RUTAS PENDIENTES ===
// app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/shelter-members", shelterMembersRoutes);
// app.use("/api/adoptions", adoptionsRoutes);
// app.use("/api/sponsorships", sponsorshipsRoutes);
// app.use("/api/notifications", notificationsRoutes);

// === SERVER ===
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});