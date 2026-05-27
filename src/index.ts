import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import { connectMongoDB } from "./config/mongoose";
import { setupSocket } from "./chat/socket/chat.socket";
import router from "./routes/routes";

// Fix para serializar BigInt a JSON (necesario con Prisma + PostgreSQL)
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

const app = express();
const httpServer = createServer(app);

// === MIDDLEWARES ===
app.use(cors());
app.use(express.json());

// === SERVIR ARCHIVOS ESTÁTICOS DE PRUEBA DEL CHAT===
app.use(express.static("./public"));

connectMongoDB();

setupSocket(httpServer);

app.use("/", router);


// === SERVER ===
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Chat con WebSocket`);
});