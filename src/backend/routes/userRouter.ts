import Express from 'express';
import { User } from '../types/User.js';
import { deleteUser, getAllUsers, getUser, newUser, updateUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { ApiResult } from '../types/ApiResult.js';

const userRouter = Express.Router();

userRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllUsers();
    res.json(result);
  });
  
userRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getUser(req.params.id);
    res.send(result);
  });
 
userRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result: ApiResult = await newUser(user);
    res.status(result.statusCode).json({message: result.message});
});

userRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
    const result: ApiResult = await deleteUser(req.params.id);
    res.status(result.statusCode).json({message: result.message});
});

userRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
  const user: User = {id: req.params.id, userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
  const result: ApiResult = await updateUser(user);
  res.status(result.statusCode).json({message: result.message});
});

export default userRouter;