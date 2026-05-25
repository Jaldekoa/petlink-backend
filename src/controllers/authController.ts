import { userService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.registerData;

        if (!data) {
            throw new Error('Datos de registro no procesados');
        }

        await userService.createUser(data);

        return res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;

        if (!user) {
            throw new Error('Credenciales incorrectas');
        }

        const token = jwt.sign(
            {
                userId: user.userId,
                email: user.email,
                role: user.role,
                username: user.username,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ message: 'Login correcto', token });
    } catch (error) {
        next(error);
    }
}

export const authController = {
    login,
    register,
};

export default authController;
