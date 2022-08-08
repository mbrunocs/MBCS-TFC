import * as express from 'express';
import loginRouter from './login';
import teamsRouter from './teams';
import matchesRouter from './matches';
import boardRouter from './leaderboard';

const routers = express.Router();
routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);
routers.use('/leaderboard', boardRouter);

export default routers;
