import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import loginService from '../services/login';
import { ILogin } from '../interfaces/IFaces';
import jwt from '../utils/jwt';

const login = async (req: Request, res: Response) => {
  const data = req.body as ILogin;
  const auth = await loginService(data);

  if (!auth.token) return res.status(401).json(auth);

  req.headers.authorization = auth.token;
  return res.status(201).json(auth);
};

const checkUser = (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const user = jwt.auth(token) as JwtPayload;
  const { data: { role } } = user;

  return res.status(200).json({ role });
};

export default {
  login,
  checkUser,
};
