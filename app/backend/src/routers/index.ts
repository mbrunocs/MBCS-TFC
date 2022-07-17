import * as express from 'express';
import loginRouter from './login';

const routers = express.Router();
routers.use('/login', loginRouter);

export default routers;
