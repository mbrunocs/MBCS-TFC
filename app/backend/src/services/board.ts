import { ITeamMatches } from '../interfaces/ITable';
import Matches from '../database/models/match';
import Teams from '../database/models/team';
// import teamService from './teams';

// referencias https://github.com/tryber/sd-017-trybe-futebol-clube/pull/150/files
const getHomeLeaderBoard = async (): Promise<ITeamMatches[]> => {
  const matches = await Teams.findAll({
    include: {
      model: Matches,
      as: 'homeMatches',
      attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      where: { inProgress: false },
    },
    attributes: { exclude: ['id'] },
  });

  return matches as ITeamMatches[];
};

// const calcGames = (team: ITeamMatches) => {
//   const totalGames = team.matches.length;
//   return totalGames;
// };

// const calcVictories = (team: ITeamMatches) => {};

// const calcDraws = (team: ITeamMatches) => {};

// const calcPoints = (team: ITeamMatches) => {};

// const calcLoses = (team: ITeamMatches) => {};

// const calcGoalsFavor = (team: ITeamMatches) => {};

// const calcGoalsOwn = (team: ITeamMatches) => {};

// const calcGoalsBalance = (team: ITeamMatches) => {};

// const calcEfficiency = (team: ITeamMatches) => {};

// const getBoard = async (): Promise<ILeaderboard[]> => {
//   const teams = await teamService.loadTeams();

//   const boardTeams = teams.map((team) => {
//     const matches = getLeaderBoard(team.id);

//     const edit = {
//       name: team.teamName,
//       totalPoints: calcPoints(team),
//       totalGames: calcGames(team),
//       totalVictories: calcVictories(team),
//       totalDraws: calcDraws(team),
//       totalLosses: calcLoses(team),
//       goalsFavor: calcGoalsFavor(team),
//       goalsOwn: calcGoalsOwn(team),
//       goalsBalance: calcGoalsBalance(team),
//       efficiency: parseFloat(calcEfficiency(team)),
//     };
//     return edit;
//   });

//   return boardTeams;
// };

export default {
  getHomeLeaderBoard,
  // getBoard,
};
