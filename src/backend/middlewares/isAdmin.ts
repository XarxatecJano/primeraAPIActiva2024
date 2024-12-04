import Express from 'express';
import jwt from "jsonwebtoken";

export function isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    if (req.session.token) {
        try{
            const decodedtoken = jwt.verify(req.session.token as string, process.env.JWT_SECRET as string);
            if(typeof decodedtoken !== 'string' && decodedtoken.role === 'admin'){
                next();
            } else {
                res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
            }
        } catch (error) {
            res.status(401).json({ error: 'No se pudo acceder al token de inicio de sesión' });
        }
    } else {
        res.status(401).json({ error: 'No existe el token de inicio de sesión' });
    }
}