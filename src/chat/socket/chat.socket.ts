import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import * as chatService from "../services/chat.service";
import { getAnimalById } from "@/services/animals.service";
import { notificationService } from "@/services/notification.service";

let connectedUsers = 0;
let io: SocketIOServer // ← exportar para usarlo en otros sitios

type AnimalRequestPayload = {
  type?: "adoption" | "sponsorship";
  animalId?: string;
}

type AnimalRequestAck = (response: { ok: true } | { ok: false; error: string }) => void

export const getIO = () => {
  if (!io) throw new Error("Socket.io no inicializado")
  return io
}

export const setupSocket = (httpServer: HTTPServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });

  io.on("connection", (socket: Socket) => {
    connectedUsers++;
    console.log(`Usuario conectado: ${socket.id} (Total: ${connectedUsers})`);

    // ← El usuario se une a su sala privada con su userId
    socket.on("join", (userId: string) => {
      socket.data.userId = userId
      socket.join(userId)
      console.log(`Usuario ${userId} unido a su sala privada`)
    })

    socket.on("animal_request", async (data: AnimalRequestPayload, callback?: AnimalRequestAck) => {
      try {
        const userId = socket.data.userId as string | undefined

        if (!userId) {
          callback?.({ ok: false, error: "Usuario no unido a su sala privada" })
          return
        }

        if (!data || (data.type !== "adoption" && data.type !== "sponsorship") || !data.animalId) {
          callback?.({ ok: false, error: "Datos de solicitud inválidos" })
          return
        }

        const animalId = BigInt(data.animalId)
        const animal = await getAnimalById(animalId)

        if (!animal) {
          callback?.({ ok: false, error: "Animal no encontrado" })
          return
        }

        const isAdoption = data.type === "adoption"

        await notificationService.createNotification({
          userId,
          title: isAdoption
            ? "Solicitud de adopción recibida"
            : "Solicitud de apadrinamiento recibida",
          body: isAdoption
            ? `Hemos recibido tu solicitud para adoptar a ${animal.name}.`
            : `Hemos recibido tu solicitud para apadrinar a ${animal.name}.`,
        })

        callback?.({ ok: true })
      } catch (error) {
        callback?.({ ok: false, error: "Error al procesar la solicitud" })
      }
    })

    socket.on("get_history", async (callback) => {
      try {
        const messages = await chatService.getMessageHistory(50);
        socket.emit("chat_history", messages);
      } catch (error: any) {
        socket.emit("error", { message: "Error al cargar el historial", code: "HISTORY_ERROR" });
      }
    });

    socket.on("send_message", async (data) => {
      try {
        if (!data || typeof data !== "object") {
          socket.emit("error", { message: "Datos de mensaje inválidos", code: "INVALID_DATA" });
          return;
        }
        const { userId, userName, content } = data;
        const message = await chatService.saveMessage(userId, userName, content);
        io.emit("receive_message", {
          _id: message._id,
          userId: message.userId,
          userName: message.userName,
          content: message.content,
          timestamp: message.timestamp
        });
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Error al guardar el mensaje", code: "SAVE_ERROR" });
      }
    });

    socket.on("get_users_count", () => {
      socket.emit("users_count", connectedUsers);
    });

    socket.on("disconnect", () => {
      connectedUsers--;
      io.emit("users_count", connectedUsers);
    });
  });

  return io;
};
