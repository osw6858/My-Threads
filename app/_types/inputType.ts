export type InputName = 'email' | 'password' | 'userName' | 'passwordCheck';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  passwordCheck?: string;
  userName?: string;
}
