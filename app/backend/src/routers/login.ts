import { Router } from 'express';
import validate from '../middlewares/requiresUser';

const router = Router();

router.get('/validate', (_req, res) => res.status(400).json({ message: 'loginPage' }));
router.post('/', validate.loginDoc, (_req, res) => res.status(400).json({ message: 'loginPage' }));

export default router;
