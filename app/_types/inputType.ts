export type InputName = 'email' | 'password' | 'nickname' | 'passwordCheck';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  passwordCheck: string;
  nickname: string;
}
