import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import * as chatService from "../services/chat.service";

let connectedUsers = 0;

export const setupSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });

  io.on("connection", (socket: Socket) => {
    connectedUsers++;
    console.log(`Usuario conectado: ${socket.id} (Total: ${connectedUsers})`);

    socket.on("get_history", async (callback) => {
      try {
        const messages = await chatService.getMessageHistory(50);
        socket.emit("chat_history", messages);
        console.log(`Historial enviado a ${socket.id}`);
      } catch (error: any) {
        console.error("Error obteniendo historial:", error.message);
        socket.emit("error", {
          message: "Error al cargar el historial",
          code: "HISTORY_ERROR"
        });
      }
    });

    socket.on("send_message", async (data) => {
      try {
        if (!data || typeof data !== "object") {
          socket.emit("error", {
            message: "Datos de mensaje inválidos",
            code: "INVALID_DATA"
          });
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

        console.log(`Mensaje guardado de ${message.userName}`);
      } catch (error: any) {
        console.error("Error enviando mensaje:", error.message);
        socket.emit("error", {
          message: error.message || "Error al guardar el mensaje",
          code: "SAVE_ERROR"
        });
      }
    });

    socket.on("get_users_count", () => {
      socket.emit("users_count", connectedUsers);
    });

    socket.on("disconnect", () => {
      connectedUsers--;
      console.log(`Usuario desconectado: ${socket.id} (Total: ${connectedUsers})`);
      io.emit("users_count", connectedUsers);
    });

    socket.on("error", (error) => {
      console.error(`Error en socket ${socket.id}:`, error);
    });
  });

  return io;
};