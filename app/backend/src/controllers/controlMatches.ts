import { Request, Response } from 'express';
import matchService from '../services/matches'; // Serviço para consultar os times
import { IMatch } from '../interfaces/IFaces'; // Interface dos times

const loadMatches = async (req: Request, res: Response) => {
  const matches = await matchService.loadMatches() as IMatch[];

  return res.status(200).json(matches);
};

const getMatchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const match = await matchService.getMatchById(+id) as IMatch;

  return res.status(200).json(match);
};

export default {
  loadMatches,
  getMatchById,
};
