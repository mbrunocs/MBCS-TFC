import { Router } from 'express';
import controlTeams from '../controllers/controlTeams';
// import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/', controlTeams.loadTeams);
router.get('/:id', controlTeams.getTeamById);

export default router;
