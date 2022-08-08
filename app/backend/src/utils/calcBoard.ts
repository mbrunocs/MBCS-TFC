import { ICalcTypes, ITeamAllMatches } from '../interfaces/ITable';

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
    all: () => (calcGoalsFavor('all', team) - calcGoalsOwn('all', team)),
  };
  return result[oper]();
};

const calcEfficiency = (oper: keyof ICalcTypes, team: ITeamAllMatches) => {
  const result: ICalcTypes = {
    home: () => ((calcPoints('home', team) / (calcGames('home', team) * 3)) * 100),
    away: () => ((calcPoints('away', team) / (calcGames('away', team) * 3)) * 100),
    all: () => ((calcPoints('all', team) / (calcGames('all', team) * 3)) * 100),
  };
  return result[oper]().toFixed(2);
};

export default {
  calcDraws,
  calcEfficiency,
  calcGames,
  calcGoalsBalance,
  calcGoalsFavor,
  calcGoalsOwn,
  calcLoses,
  calcPoints,
  calcVictories,
};
