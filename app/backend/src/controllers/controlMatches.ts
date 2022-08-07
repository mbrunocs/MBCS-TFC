import { Request, Response } from 'express';
import matchService from '../services/matches'; // Serviço para consultar os times
import { IMatch, IMatchProgress, IMatchUpdate } from '../interfaces/IFaces'; // Interface dos times

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

const upScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as IMatchUpdate;
  await matchService.updateMatch(+id, data);
  const match = await matchService.getMatchById(+id) as IMatch;

  return res.status(200).json(match);
};

export default {
  loadMatches,
  getMatchById,
  newMatch,
  toEndMatch,
  upScore,
};
