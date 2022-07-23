import { Request, Response } from 'express';
import loginService from '../services/login';
import { ILogin } from '../interfaces/IFaces';

const login = async (req: Request, res: Response) => {
  const data = req.body as ILogin;
  const auth = await loginService(data);

  if (!auth.token) return res.status(401).json(auth);

  req.headers.authorization = auth.token;
  return res.status(201).json(auth);
};

export default {
  login,
};
