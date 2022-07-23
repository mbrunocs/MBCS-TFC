import * as bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';
import Users from '../database/models/user';
import { ILogin } from '../interfaces/IFaces';

export default async (data: ILogin) => {
  const { email, password } = data;

  const user = await Users.findOne({ where: { email } });
  if (!user) return { message: 'Incorrect email or password' }; // usuario inválido

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) return { message: 'Incorrect email or password' };

  return { token: jwt.generateToken(user) }; // retorna o token após confirmar os email e senha
};
