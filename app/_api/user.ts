import { supabase } from '../_supabase/supabaseClient';

export const getAllUser = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
