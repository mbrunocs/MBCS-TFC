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
