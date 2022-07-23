import jwt = require('jsonwebtoken');

const SECRET_ = process.env.JWT_SECRET;
const SECRET = SECRET_ as string;
// const authConfig = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
// };

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
