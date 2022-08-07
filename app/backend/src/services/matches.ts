import { IMatchProgress, IMatch } from '../interfaces/IFaces';
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

const insertMatch = async (data: IMatch): Promise<IMatchProgress> => {
  const match = await Matches.create(data) as IMatchProgress;
  return match;
};

const finishMatch = async (id: number): Promise<void> => {
  await Matches.update({ inProgress: false }, { where: { id } });
};

export default {
  loadMatches,
  getMatchById,
  insertMatch,
  finishMatch,
};
