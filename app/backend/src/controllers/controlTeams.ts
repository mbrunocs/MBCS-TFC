// import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import teamService from '../services/teams'; // Serviço para consultar os times
import { ITeams } from '../interfaces/IFaces'; // Interface dos times
// import jwt from '../utils/jwt';

const loadTeams = async (req: Request, res: Response) => {
  const teams = await teamService.loadTeams() as ITeams;

  return res.status(200).json(teams);
};

export default {
  loadTeams,
};
