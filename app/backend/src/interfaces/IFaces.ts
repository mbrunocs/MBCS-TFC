export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  username?: string;
  role?: string;
}

export interface IJwt {
  token?: string;
  message?: string;
}

export interface ITeam {
  id?: number;
  teamName: string;
}

export type ITeams = [ ITeam ];

export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IMatchProgress extends IMatch {
  id?: number,
  inProgress: boolean,
}

export interface InUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
