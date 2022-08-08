import { Router } from 'express';
import controlBoard from '../controllers/controlBoard';

const router = Router();

router.get('/', controlBoard.getHomeTeamBoard);
// router.get('/:id');

export default router;
