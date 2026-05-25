import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from "@/services";
import { user_role } from "@prisma/client";
import { AppError } from "@/utils";


async function isRegisterDataCorrect(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password, passwordRepeat, fullName, phone } = req.body;

    if (!username || !email || !password || !passwordRepeat) {
      throw new AppError('Faltan campos obligatorios', 400);
    }

    if (password !== passwordRepeat) {
      throw new AppError('Las contraseñas no coinciden', 400);
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new AppError('El email ya está registrado', 409);
    }

    const hash = await bcrypt.hash(password, 10);

    req.registerData = {
      username,
      email,
      passwordHash: hash,
      fullName,
      phone,
      role: user_role.usuario,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function checkCredentials(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Faltan campos obligatorios', 400);
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new AppError('Credenciales incorrectas', 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new AppError('Credenciales incorrectas', 401);
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role as user_role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}


function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Token no proporcionado', 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
      role: user_role;
      username: string;
    };

    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expirado', 401));
    }

    return next(new AppError('Token inválido', 401));
  }
}


function requireRole(...roles: user_role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Usuario no autenticado', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Acceso denegado', 403));
    }

    next();
  };
}

export {
  isRegisterDataCorrect,
  checkCredentials,
  verifyToken,
  requireRole
};
