import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

const message = 'Token must be a valid token';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const TOKEN = req.headers.authorization as string;

    if (!TOKEN) {
      return res.status(401).json({ message });
    }

    jwt.auth(TOKEN);

    next();
  } catch (error) {
    return res.status(401).json({ message });
  }
};

export default validateToken;
