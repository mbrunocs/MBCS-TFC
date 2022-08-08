import { Request, Response } from 'express';
import serviceBoard from '../services/board';
// import { ILeaderboard } from '../interfaces/ITable';

const getHomeTeamBoard = async (req: Request, res: Response) => {
  const homeTeamBoard = await serviceBoard.getHomeLeaderBoard();

  return res.status(200).json(homeTeamBoard);
};

export default {
  getHomeTeamBoard,
};
