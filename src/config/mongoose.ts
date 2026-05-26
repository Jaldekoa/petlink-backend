import mongoose from "mongoose";
import "dotenv/config";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando MongoDB:", error);
    process.exit(1);
  }
};