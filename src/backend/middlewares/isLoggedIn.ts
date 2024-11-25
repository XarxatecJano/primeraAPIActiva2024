import Express from 'express';

export function isLoggedIn(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    if (req.session.userName) {
        next();
    } else {
        res.status(401).json({ error: 'No estás identificado. Por favor, iniicia sesión' });
    }
}