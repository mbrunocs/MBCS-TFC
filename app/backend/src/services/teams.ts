import { ITeam } from '../interfaces/IFaces';
import Teams from '../database/models/team';

const loadTeams = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();
  // if (!teams) return { message: 'Incorrect email or password' }; // não retornou times

  return teams;
};

const getTeamById = async (id: number): Promise<ITeam> => {
  const team = await Teams.findOne({ where: { id } }) as ITeam;
  // if (!team) return { message: 'Incorrect email or password' }; // não retornou times

  return team;
};

export default {
  loadTeams,
  getTeamById,
};
