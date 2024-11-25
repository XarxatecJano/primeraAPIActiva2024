import Express from 'express';
import { publicPath, __dirname } from './config/configData.js';
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';
import methodOverride from 'method-override';
import path from 'path';
import { loginRouter } from './routes/loginRouter.js';
import session from 'express-session';

const app = Express();
const port = 3000;

app.use(Express.urlencoded({ extended: true }));

app.use(Express.static(publicPath));

app.use('/src', Express.static(path.join(__dirname, '../../public/src')));

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  name: 'sessionData',
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2, },
}));

app.use(methodOverride((req:Express.Request, res:Express.Response)=> {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use("/", staticRouter);
app.use("/login", loginRouter);
app.use("/api/v1/", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


