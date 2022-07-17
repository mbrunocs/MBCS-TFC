import * as express from 'express';

const router = express.Router();
// const userControl = require('../controllers/userControl');
// const { userReqPost } = require('../middlewares/userReqValid');
// const validateJWT = require('../middlewares/validateJWT');

router.get('/', (_req, res) => res.status(400).json({ message: 'loginPage' }));
// router.post('/', userReqPost, userControl.createUser);
// router.get('/:id', validateJWT, userControl.findUserById);
// router.delete('/me', validateJWT, userControl.deleteUser);

export default router;
