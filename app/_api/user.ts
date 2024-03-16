import { supabase } from '../_supabase/supabaseClient';

export const getAllUser = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async (uid: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', uid)
      .single();

    if (error) console.error(error);

    return data;
  } catch (error) {
    console.error(error);
  }
};
