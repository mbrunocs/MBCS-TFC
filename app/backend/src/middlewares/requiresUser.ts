import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ILogin, IUser } from '../interfaces/IFaces';

const isRequired = Joi.object({
  username: Joi.string().min(8).max(256).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().length(6).required(),
});

const loginRequirer = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userDoc = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, role } = req.body as IUser;
    Joi.assert({ username, email, password, role }, isRequired);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.details[0].message });
  }
};

const loginDoc = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as ILogin;
    Joi.assert({ email, password }, loginRequirer);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.details[0].message });
  }
};

export default {
  userDoc,
  loginDoc,
};
