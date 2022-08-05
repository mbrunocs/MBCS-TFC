import * as express from 'express';
import loginRouter from './login';
import teamsRouter from './teams';

const routers = express.Router();
routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);

export default routers;
