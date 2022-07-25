import jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

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
