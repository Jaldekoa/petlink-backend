import { Message } from "../models/Message";

const validateMessageInput = (userId: string, userName: string, content: string) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId inválido");
  }

  if (!userName || typeof userName !== "string") {
    throw new Error("userName es requerido");
  }

  if (userName.trim().length < 2) {
    throw new Error("El nombre debe tener al menos 2 caracteres");
  }

  if (userName.trim().length > 50) {
    throw new Error("El nombre no puede exceder 50 caracteres");
  }

  if (!content || typeof content !== "string") {
    throw new Error("El contenido del mensaje es requerido");
  }

  const trimmedContent = content.trim();
  if (trimmedContent.length === 0) {
    throw new Error("El mensaje no puede estar vacío");
  }

  if (trimmedContent.length > 500) {
    throw new Error("El mensaje no puede exceder 500 caracteres");
  }

  return {
    userId: userId.trim(),
    userName: userName.trim(),
    content: trimmedContent
  };
};

export const saveMessage = async (
  userId: string,
  userName: string,
  content: string
) => {
  try {
    const validatedData = validateMessageInput(userId, userName, content);

    const message = await Message.create({
      userId: validatedData.userId,
      userName: validatedData.userName,
      content: validatedData.content,
      timestamp: new Date()
    });

    return message;
  } catch (error: any) {
    throw new Error(`Error al guardar mensaje: ${error.message}`);
  }
};

export const getMessageHistory = async (limit: number = 50) => {
  try {
    if (limit < 1 || limit > 100) {
      limit = 50;
    }

    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    return messages.reverse();
  } catch (error: any) {
    throw new Error(`Error al obtener historial: ${error.message}`);
  }
};

export const getMessageById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID de mensaje requerido");
    }

    const message = await Message.findById(id);
    return message;
  } catch (error: any) {
    throw new Error(`Error al obtener mensaje: ${error.message}`);
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const result = await Message.findByIdAndDelete(id);
    return result;
  } catch (error: any) {
    throw new Error(`Error al eliminar mensaje: ${error.message}`);
  }
};

export const getMessageCount = async () => {
  try {
    return await Message.countDocuments();
  } catch (error: any) {
    throw new Error(`Error al contar mensajes: ${error.message}`);
  }
};