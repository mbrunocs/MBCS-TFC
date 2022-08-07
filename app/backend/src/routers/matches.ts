import { Router } from 'express';
import controlMatches from '../controllers/controlMatches';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/', controlMatches.loadMatches);
router.post('/', authJwt, controlMatches.newMatch);

export default router;
