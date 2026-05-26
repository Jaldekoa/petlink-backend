import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  userId: string;          
  userName: string;       
  content: string;         
  timestamp: Date;         
}

const messageSchema = new Schema<IMessage>({
  userId: { 
    type: String, 
    required: [true, "userId es requerido"],
    trim: true
  },
  userName: { 
    type: String, 
    required: [true, "userName es requerido"],
    trim: true,
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [50, "El nombre no puede exceder 50 caracteres"]
  },
  content: { 
    type: String, 
    required: [true, "El contenido del mensaje es requerido"],
    trim: true,
    minlength: [1, "El mensaje no puede estar vacío"],
    maxlength: [500, "El mensaje no puede exceder 500 caracteres"]
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    immutable: true
  }
});

messageSchema.index({ timestamp: -1 });
messageSchema.index({ userId: 1 });

export const Message = mongoose.model<IMessage>("Message", messageSchema);