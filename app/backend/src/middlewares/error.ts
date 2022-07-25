import { Request, Response, NextFunction, Errback } from 'express';

export default (error: Errback, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);

  return res.status(500).json({ message: 'Não foi possível processar a requisição!' });
};
