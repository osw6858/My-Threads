import { supabase } from '../_supabase/supabaseClient';

export const addfollowUser = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  const { data, error } = await supabase
    .from('follows')
    .insert([{ follower_id: followerId, following_id: followingId }]);

  if (error) {
    console.error('Error following user', error);
  }
  return data;
};

export const getFollowingUsers = async (loggedInUserId: string) => {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
      following_id
    `,
    )
    .eq('follower_id', loggedInUserId); // 로그인한 사용자의 ID와 'follower_id'가 일치하는 행 찾기

  if (error) console.error(error);
  return data;
};

export const removeFollowingUser = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  const { data, error } = await supabase
    .from('follows')
    .delete()
    .match({ follower_id: followerId, following_id: followingId });

  if (error) {
    console.error('Error following user', error);
  }
  return data;
};

export const getFollowerUser = async (targetUserId: string) => {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
      follower_id
     
    `,
    )
    .eq('following_id', targetUserId);

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
