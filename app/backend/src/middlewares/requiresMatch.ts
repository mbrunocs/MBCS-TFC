import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { IMatch } from '../interfaces/IFaces';
import teamService from '../services/teams';

const ERROR_EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
const ERROR_TEAM_OUT_RANGE = 'There is no team with such id!';

const loadTeamsSize = async (): Promise<number> => {
  const teams = await teamService.loadTeams().then();
  return teams.length;
};

const newMatchRequirer = Joi.object({
  homeTeam: Joi.number().required().messages({
    'number.empty': 'All fields must be filled',
  }),
  awayTeam: Joi.number().required().messages({
    'number.empty': 'All fields must be filled',
  }),
});

const newMatchDoc = async (req: Request, res: Response, next: NextFunction) => {
  const TOTAL_TEAMS = await loadTeamsSize();
  try {
    const { homeTeam, awayTeam } = req.body as IMatch;
    if (homeTeam === awayTeam) return res.status(401).json({ message: ERROR_EQUAL_TEAMS });
    if (homeTeam > TOTAL_TEAMS || awayTeam > TOTAL_TEAMS) {
      return res.status(404).json({ message: ERROR_TEAM_OUT_RANGE });
    }
    Joi.assert({ homeTeam, awayTeam }, newMatchRequirer);
    next();
  } catch (err) {
    if (err instanceof Joi.ValidationError) {
      return res.status(400).json({ message: err.details[0].message });
    }
    next(err);
  }
};

export default {
  newMatchDoc,
};
