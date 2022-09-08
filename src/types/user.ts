export interface IUserAuth {
  username: string;
  password: string;
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserConfirm {
  token: string;
  uid: string;
}

export interface ITokens {
  refresh: string;
  access: string;
}

export interface IProfile {
  username: string;
  id: number;
  email: string;
}
