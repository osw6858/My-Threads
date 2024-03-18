import { supabase } from '../_supabase/supabaseClient';
import { SignInData, SignUpData } from '../_types/inputType';

export const signInWhithEmail = async (signInData: SignInData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password,
    });
    if (error) console.error(error);

    return { data, error };
  } catch (error) {
    console.error(error);
  }
};

export const signInWithKakao = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (signUpData: SignUpData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: {
        data: {
          user_name: signUpData.userName,
        },
      },
    });
    if (error) console.error(error);
    return { data, error };
  } catch (error) {
    console.error(error);
  }
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) console.error(error);

  return data;
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) console.error(error);
  return { data, error };
};
