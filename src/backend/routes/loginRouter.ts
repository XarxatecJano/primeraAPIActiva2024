import Express from "express";
import { LoginUser } from "../types/LoginUser.js";
import { userLogin } from "../controllers/loginController.js";
import jwt from "jsonwebtoken";

const loginRouter = Express.Router();

loginRouter.post('/', async (req: Express.Request, res: Express.Response) => {
  const user: LoginUser = {userName: req.body.username, password: req.body.password};
  const result = await userLogin(user);
  let newToken: string = "no te identificaste con éxito";
  if (result.success) {
    if (result.data?.[0] && 'role' in result.data[0]) {
      try{
        const decodedtoken = jwt.verify(req.session.token as string, process.env.JWT_SECRET as string);
        const decodedtokenJson = await JSON.parse(JSON.stringify(decodedtoken));
        newToken = jwt.sign({...decodedtokenJson, userName: user.userName, role: result.data[0].role as string}, process.env.JWT_SECRET as string)
        req.session.token = newToken;
      } catch (error) {
        newToken = "Token inválido";
      }
    }
  }
  res.status(401).json({token: newToken});
});

export {loginRouter};

