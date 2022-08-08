import { ITeamHMatches, ITeamAMatches, ILeaderboard,
  ITeamAllMatches, ICalcTypes } from '../interfaces/ITable';
import Matches from '../database/models/match';
import Teams from '../database/models/team';
import util from '../utils/calcBoard';

// referencias https://github.com/tryber/sd-017-trybe-futebol-clube/pull/150/files
const getHomeMatches = async (): Promise<ITeamHMatches[]> => {
  const homeMatches = await Teams.findAll({
    include: {
      model: Matches,
      as: 'homeMatches',
      attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      where: { inProgress: false },
    },
    attributes: { exclude: ['id'] },
  });

  return homeMatches as ITeamHMatches[];
};

const getAwayMatches = async (): Promise<ITeamAMatches[]> => {
  const awayMatches = await Teams.findAll({
    include: {
      model: Matches,
      as: 'awayMatches',
      attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      where: { inProgress: false },
    },
    attributes: { exclude: ['id'] },
  });

  return awayMatches as ITeamAMatches[];
};

const getDataMatches = async (): Promise<ITeamAllMatches[]> => {
  const allMatches = await Teams.findAll({
    include: [{
      model: Matches,
      as: 'homeMatches',
      attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      where: { inProgress: false },
    }, {
      model: Matches,
      as: 'awayMatches',
      attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      where: { inProgress: false },
    }],
    attributes: { exclude: ['id'] },
  });

  return allMatches as ITeamAllMatches[];
};

const orderBoard = (board: ILeaderboard[]) => {
  const order = board.sort((a: any, b: any) => (
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
  ));
  return order;
};

const listBoard = async (oper: keyof ICalcTypes): Promise<ILeaderboard[]> => {
  const teams = await getDataMatches();

  const homeTeamsBoard = teams.map((team) => {
    const edit = {
      name: team.teamName,
      totalPoints: util.calcPoints(oper, team),
      totalGames: util.calcGames(oper, team),
      totalVictories: util.calcVictories(oper, team),
      totalDraws: util.calcDraws(oper, team),
      totalLosses: util.calcLoses(oper, team),
      goalsFavor: util.calcGoalsFavor(oper, team),
      goalsOwn: util.calcGoalsOwn(oper, team),
      goalsBalance: util.calcGoalsBalance(oper, team),
      efficiency: parseFloat(util.calcEfficiency(oper, team)),
    };
    return edit;
  });

  return orderBoard(homeTeamsBoard);
};

export default {
  listBoard,
  getDataMatches,
  getAwayMatches,
  getHomeMatches,
};
