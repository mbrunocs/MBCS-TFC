import Teams from '../database/models/team';

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface ITeamMatches extends Teams {
  teamName: string;
  homeMatches: [{
    homeTeamGoals: number;
    awayTeamGoals: number;
  }];
}

export interface ITeamAwayMatches extends Teams {
  teamName: string;
  awayMatches: [{
    homeTeamGoals: number;
    awayTeamGoals: number;
  }];
}
