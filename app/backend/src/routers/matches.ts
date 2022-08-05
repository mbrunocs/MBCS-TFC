import { Router } from 'express';
import controlMatches from '../controllers/controlMatches';
// import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/', controlMatches.loadMatches);
router.get('/:id', controlMatches.getMatchById);

export default router;
