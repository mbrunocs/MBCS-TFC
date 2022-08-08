import { Router } from 'express';
import controlBoard from '../controllers/controlBoard';

const router = Router();

router.get('/home', controlBoard.getHomeTeamBoard);
router.get('/away', controlBoard.getHomeTeamBoard);
router.get('/', controlBoard.getHomeTeamBoard);
// router.get('/:id');

export default router;
