import { Router } from 'express';
import controlTeams from '../controllers/controlTeams';
// import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/', controlTeams.loadTeams);
// router.post('/', validate.loginDoc, controlLogin.login);

export default router;
