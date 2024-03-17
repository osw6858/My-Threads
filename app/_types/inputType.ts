export type InputName = 'email' | 'password' | 'userName' | 'passwordCheck';

export type ProfileName = 'user_name' | 'user_intro' | 'avatar_url';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  passwordCheck?: string;
  userName?: string;
}

export interface ProfileData {
  user_name: string;
  user_intro: string;
  avatar_url: string;
}
