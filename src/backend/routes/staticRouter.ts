import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { generateJwt } from '../utils/generateJwt.js';

const staticRouter = Express.Router();

staticRouter.get('/newUser',isLoggedIn, isAdmin, (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/updateUser/:id', isLoggedIn, validateNumericParams, (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/updateUser.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/usersManagement', isLoggedIn, isAdmin, (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/usersManagement.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/login', (req: Express.Request, res: Express.Response) => {
    const token = generateJwt();
    req.session.token = token;
    const targetFilePath = path.join(publicPath, "/login.html");
    res.sendFile(targetFilePath);
});

export {staticRouter} ;

