import { supabase } from '../_supabase/supabaseClient';

interface LikeActive {
  likedPost: number;
  uuid: string;
  type: string;
}

export const addLikeActivity = async ({
  likedPost,
  uuid,
  type,
}: LikeActive) => {
  const { data: user, error } = await supabase
    .from('posts')
    .select(` * , users(*)`)
    .eq('post_id', likedPost)
    .single();

  if (error) {
    console.error(error);
  }
  const { data: currentUser, error: currentuserError } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', uuid)
    .single();

  if (currentuserError) {
    console.error(error);
  }

  if (user && currentUser) {
    const likeData = {
      target_user: user.users.uuid,
      active_user: uuid,
      post_id: likedPost,
      type,
      content: `${currentUser.user_name} 님이 회원님의 스레드에 좋아요를 눌렀습니다.`,
    };

    const { error } = await supabase.from('activities').insert([likeData]);

    if (error) {
      console.error(error);
    }
  }
};

export const getLikeActivity = async (uuid: string) => {
  const { data, error } = await supabase
    .from('activities')
    .select(`*, users!public_activities_active_user_fkey(*)`)
    .eq('target_user', uuid)
    .range(0, 10)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('알림을 불러오는 중 오류 발생', error);
  }

  return { data, error };
};
