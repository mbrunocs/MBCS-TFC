import { ITeam } from '../interfaces/IFaces';
import Teams from '../database/models/team';

const loadTeams = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();
  // if (!teams) return { message: 'Incorrect email or password' }; // não retornou times

  return teams;
};

export default {
  loadTeams,
};
