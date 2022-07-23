import jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_ = process.env.JWT_SECRET;
const SECRET = SECRET_ as string;

const generateToken = (data = {}) => jwt.sign(
  { data },
  SECRET,
  { expiresIn: '1d' },
);

const auth = (token: string) => jwt.verify(token, SECRET);

export default {
  generateToken,
  auth,
};
