import { Request, Response } from 'express';
import matchService from '../services/matches'; // Serviço para consultar os times
import { IMatch, IMatchProgress } from '../interfaces/IFaces'; // Interface dos times

const loadMatches = async (req: Request, res: Response) => {
  const matches = await matchService.loadMatches() as IMatch[];

  return res.status(200).json(matches);
};

const getMatchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const match = await matchService.getMatchById(+id) as IMatch;

  return res.status(200).json(match);
};

const newMatch = async (req: Request, res: Response) => {
  const data = req.body as IMatch;
  const dataMatch = { ...data, inProgress: true } as IMatchProgress;
  const match = await matchService.insertMatch(dataMatch) as IMatchProgress;

  return res.status(201).json(match);
};

const toEndMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchService.finishMatch(+id);

  return res.status(200).json({ message: 'Finished' });
};

export default {
  loadMatches,
  getMatchById,
  newMatch,
  toEndMatch,
};
