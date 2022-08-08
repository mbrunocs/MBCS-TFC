import { ITeamHMatches, ITeamAMatches, ILeaderboard,
  ITeamAllMatches, ICalcTypes } from '../interfaces/ITable';
import Matches from '../database/models/match';
import Teams from '../database/models/team';

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

const calcGames = (oper: keyof ICalcTypes, team: ITeamAllMatches): number => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.length),
    away: () => (team.awayMatches.length),
    all: () => (team.homeMatches.length + team.awayMatches.length),
  };
  return result[oper]();
};

const calcVictories = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.reduce<number>((victories, match) => {
      let wins = victories;
      if (match.homeTeamGoals > match.awayTeamGoals) wins += 1;
      return wins;
    }, 0)),
    away: () => (team.awayMatches.reduce<number>((victories, match) => {
      let wins = victories;
      if (match.awayTeamGoals > match.homeTeamGoals) wins += 1;
      return wins;
    }, 0)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcDraws = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.reduce<number>((draws, match) => {
      let total = draws;
      if (match.homeTeamGoals === match.awayTeamGoals) total += 1;
      return total;
    }, 0)),
    away: () => (team.awayMatches.reduce<number>((draws, match) => {
      let total = draws;
      if (match.awayTeamGoals === match.homeTeamGoals) total += 1;
      return total;
    }, 0)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcPoints = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (calcVictories('home', team) * 3 + calcDraws('home', team)),
    away: () => (calcVictories('away', team) * 3 + calcDraws('away', team)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcLoses = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.reduce<number>((loses, match) => {
      let total = loses;
      if (match.homeTeamGoals < match.awayTeamGoals) total += 1;
      return total;
    }, 0)),
    away: () => (team.awayMatches.reduce<number>((loses, match) => {
      let total = loses;
      if (match.awayTeamGoals < match.homeTeamGoals) total += 1;
      return total;
    }, 0)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcGoalsFavor = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.reduce<number>((homeGoals, goals) => {
      let total = homeGoals;
      total += goals.homeTeamGoals;
      return total;
    }, 0)),
    away: () => (team.awayMatches.reduce<number>((awayGoals, goals) => {
      let total = awayGoals;
      total += goals.awayTeamGoals;
      return total;
    }, 0)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcGoalsOwn = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (team.homeMatches.reduce<number>((homeGoals, goals) => {
      let total = homeGoals;
      total += goals.awayTeamGoals;
      return total;
    }, 0)),
    away: () => (team.awayMatches.reduce<number>((awayGoals, goals) => {
      let total = awayGoals;
      total += goals.homeTeamGoals;
      return total;
    }, 0)),
    all: () => (result.home() + result.away()),
  };
  return result[oper]();
};

const calcGoalsBalance = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => (calcGoalsFavor('home', team) - calcGoalsOwn('home', team)),
    away: () => (calcGoalsFavor('away', team) - calcGoalsOwn('away', team)),
    all: () => (result.home() - result.away()),
  };
  return result[oper]();
};

const calcEfficiency = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => ((calcPoints('home', team) / (calcGames('home', team) * 3)) * 100),
    away: () => ((calcPoints('away', team) / (calcGames('away', team) * 3)) * 100),
    all: () => (result.home() - result.away()),
  };
  return result[oper]().toFixed(2);
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
      totalPoints: calcPoints(oper, team),
      totalGames: calcGames(oper, team),
      totalVictories: calcVictories(oper, team),
      totalDraws: calcDraws(oper, team),
      totalLosses: calcLoses(oper, team),
      goalsFavor: calcGoalsFavor(oper, team),
      goalsOwn: calcGoalsOwn(oper, team),
      goalsBalance: calcGoalsBalance(oper, team),
      efficiency: parseFloat(calcEfficiency(oper, team)),
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
