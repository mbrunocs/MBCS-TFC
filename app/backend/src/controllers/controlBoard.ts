import { Request, Response } from 'express';
import serviceBoard from '../services/board';
// import { ILeaderboard } from '../interfaces/ITable';

const getHomeTeamBoard = async (req: Request, res: Response) => {
  const homeTeamBoard = await serviceBoard.listBoard('home');

  return res.status(200).json(homeTeamBoard);
};

const getAwayTeamBoard = async (req: Request, res: Response) => {
  const homeTeamBoard = await serviceBoard.listBoard('away');

  return res.status(200).json(homeTeamBoard);
};

const getLeaderBoard = async (req: Request, res: Response) => {
  const homeTeamBoard = await serviceBoard.listBoard('all');

  return res.status(200).json(homeTeamBoard);
};

export default {
  getHomeTeamBoard,
  getAwayTeamBoard,
  getLeaderBoard,
};
