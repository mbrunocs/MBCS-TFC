import { Router } from 'express';
import controlLogin from '../controllers/controlLogin';
import validate from '../middlewares/requiresUser';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/validate', authJwt, controlLogin.checkUser);
router.post('/', validate.loginDoc, controlLogin.login);

export default router;
