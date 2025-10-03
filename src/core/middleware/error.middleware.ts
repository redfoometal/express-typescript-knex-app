import { Request, Response, NextFunction } from 'express';
import { isHttpException } from '../exceptions/utils';

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (isHttpException(error)) {
        return res.status(error.statusCode).json({
            error: {
                name: error.name,
                message: error.message,
                statusCode: error.statusCode,
                timestamp: error.timestamp
            }
        });
    }

    console.error('Unhandled error:', error);
    res.status(500).json({
        error: {
            name: 'InternalServerError',
            message: 'Внутренняя ошибка сервера',
            statusCode: 500,
            timestamp: new Date().toISOString()
        }
    });
}