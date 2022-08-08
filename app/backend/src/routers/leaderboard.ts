import { Router } from 'express';
import controlBoard from '../controllers/controlBoard';

const router = Router();

router.get('/home', controlBoard.getHomeTeamBoard);
router.get('/away', controlBoard.getAwayTeamBoard);
router.get('/', controlBoard.getLeaderBoard);

export default router;
