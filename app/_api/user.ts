import { supabase } from '../_supabase/supabaseClient';
import { ProfileData } from '../_types/inputType';

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

export const getUserInfoWithUserName = async (userName: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_name', userName)
    .single();

  if (error) console.error(error);
  return data;
};

export const uploadProfilImage = async (fileData: {
  image: File;
  uuid: string;
}) => {
  // TODO: 한글파일에 대한 대응 방법 변경 필요.
  const fileName = fileData.image.name.replace(/[^a-zA-Z0-9_.-]/g, '_');

  const currentTimeInSeconds = Math.floor(
    new Date().getTime() / 1000,
  ).toString();

  const filePath = `profil/${fileName}${currentTimeInSeconds}${fileData.uuid}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, fileData.image);

  if (error) console.error('Error uploading file:', error.message);

  return { data, error };
};

export const updateProfile = async ({
  uuid,
  user_name,
  avatar_url,
  user_intro,
}: {
  uuid: string;
  user_name: string;
  avatar_url: string;
  user_intro: string;
}) => {
  const { data, error } = await supabase
    .from('users')
    .update({ user_name, avatar_url, user_intro })
    .eq('uuid', uuid);

  if (error) {
    console.error('Error updating profile', error);
  }
  return { data, error };
};

export const getUserList = async () => {
  const { data, error } = await supabase
    .from('users')
    .select(
      `*,
    follows!fk_following(follower_id)
    `,
    )
    .range(0, 20)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('유저를 불러오는 중 에러 발생', error);
  }

  return { data, error };
};
