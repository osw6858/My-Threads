import { supabase } from '../_supabase/supabaseClient';

export const getPost = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
