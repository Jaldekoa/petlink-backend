import { AppError } from '@/utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware global de errores. Traduce errores de negocio y de Sequelize
 * a respuestas HTTP consistentes para la API.
 *
 * @param err Error capturado durante el ciclo de request.
 * @param req Request HTTP original.
 * @param res Response HTTP usada para devolver el error al cliente.
 * @param next Next function de Express.
 * @returns Respuesta JSON con el código y mensaje adecuados.
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Ya existe un registro con esos datos' });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ error: 'Referencia a un registro que no existe' });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
}
