import { supabase } from '../_supabase/supabaseClient';

interface PostLike {
  postId: number;
  userId: string;
}

interface CommentLike {
  commentId: number;
  userId: string;
}

export const addPostLike = async ({ postId, userId }: PostLike) => {
  const { data, error } = await supabase
    .from('post_likes')
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    console.error(`포스팅 좋아요 추가 에러: ${error}`);
    return { error };
  }
  return data;
};

export const removePostLike = async ({ postId, userId }: PostLike) => {
  const { data, error } = await supabase
    .from('post_likes')
    .delete()
    .match({ post_id: postId, user_id: userId });

  if (error) {
    console.error(`포스팅 좋아요 삭제 에러: ${error}`);
    return { error };
  }

  return data;
};

export const addCommentLike = async ({ commentId, userId }: CommentLike) => {
  const { data, error } = await supabase.from('comment_likes').insert([
    {
      comment_id: commentId,
      user_id: userId,
    },
  ]);

  if (error) {
    console.error(error);
    return { error };
  }
  return data;
};

export const removeCommentLike = async ({ commentId, userId }: CommentLike) => {
  const { data, error } = await supabase.from('comment_likes').delete().match({
    comment_id: commentId,
    user_id: userId,
  });

  if (error) {
    console.error(`댓글 좋아요 삭제 에러: ${error}`);
    return { error };
  }
  return data;
};
