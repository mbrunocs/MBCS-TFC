import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
// import IJWT from '../interfaces/IJwt';
// import Users from '../database/models/user';

dotenv.config();

const message = 'Token must be a valid token';
// const USER_NOT_FOUND = { message: 'Token user not found' };
const SECRET = process.env.JWT_SECRET as jwt.Secret;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const TOKEN = req.headers.authorization as string;

    if (!TOKEN) {
      return res.status(401).json({ message });
    }

    jwt.verify(TOKEN, SECRET);
    // const decoded = jwt.verify(TOKEN, SECRET);
    // const user = await Users
    //   .findOne({ where: { email: decoded }, attributes: { exclude: ['password'] } });

    // if (!user) return res.status(401).json(USER_NOT_FOUND);
    // req.user = user.dataValues as IJWT;

    next();
  } catch (error) {
    return res.status(401).json({ message });
  }
};

export default validateToken;
