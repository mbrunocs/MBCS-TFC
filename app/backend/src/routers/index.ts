import * as express from 'express';
import loginRouter from './login';
import teamsRouter from './teams';
import matchesRouter from './matches';

const routers = express.Router();
routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);

export default routers;
