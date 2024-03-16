import { supabase } from '../_supabase/supabaseClient';

interface Like {
  postId: number;
  userId: string;
}

export const addLike = async ({ postId, userId }: Like) => {
  console.log(`${postId}번 게시물 좋아요 누름 아이디는 ${userId}임`);
  const { data, error } = await supabase
    .from('likes')
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    console.error(`좋아요 추가 에러: ${error}`);
    return { error };
  }
  return data;
};

export const removeLike = async ({ postId, userId }: Like) => {
  console.log(`${postId}번 게시물 좋아요 취소 누름 아이디는 ${userId}임`);
  const { data, error } = await supabase
    .from('likes')
    .delete()
    .match({ post_id: postId, user_id: userId });

  if (error) {
    console.error(`좋아요 삭제 에러: ${error}`);
    return { error };
  }

  return data;
};
