import { Request, Response, NextFunction } from "express";

// MOCK TEMPORAL SE BORRA CUANDO ESTÉ EL AUTH REAL)
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (req as any).user = {
    id: "00000000-0000-0000-0000-000000000001",
    email: "admin@petlink.com",
    role: "admin"
  };
  next();
};