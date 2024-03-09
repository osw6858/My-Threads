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
          nickname: signUpData.nickname,
        },
      },
    });
    if (error) console.error(error);
    return { data, error };
  } catch (error) {
    console.error(error);
  }
};
