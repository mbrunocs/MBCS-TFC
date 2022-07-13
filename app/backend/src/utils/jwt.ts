import jwt = require('jsonwebtoken');
import IJWT from '../interfaces/IJwt';

const SECRET_ = process.env.JWT_SECRET;
const SECRET = SECRET_ as string;
// const authConfig = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
// };

const generateToken = (data: IJWT) => jwt.sign(
  { data },
  SECRET,
  { expiresIn: '1d' },
);

const auth = (data = {}) => jwt.sign({ data }, SECRET, { expiresIn: '1d', algorithm: 'HS256' });

export default {
  generateToken,
  auth,
};
