import { IMatchProgress } from '../interfaces/IFaces';
import Matches from '../database/models/match';
import Teams from '../database/models/team';

const loadMatches = async (): Promise<IMatchProgress[]> => {
  const matches = await Matches.findAll({ include: [
    { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
  });

  return matches;
};

const getMatchById = async (id: number): Promise<IMatchProgress> => {
  const match = await Matches.findOne({ where: { id } }) as IMatchProgress;
  // if (!team) return { message: 'Incorrect email or password' }; // não retornou times

  return match;
};

export default {
  loadMatches,
  getMatchById,
};
