import Express from 'express';

export function isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }
}