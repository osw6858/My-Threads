import { supabase } from '../_supabase/supabaseClient';

export const getComments = async (
  postId: number | undefined,
  page = 1,
  limit = 5,
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit - 1;

  const { data, error, count } = await supabase
    .from('comments')
    .select(
      `
      *,
      users (
        id,
        user_name,
        avatar_url
      ),
      comment_likes(user_id)
    `,
      { count: 'exact' },
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
    .range(startIndex, endIndex);

  if (error) {
    console.error(`댓글 및 사용자 정보 불러오기 에러`, error);
  }

  return { data, error, count };
};

export const addComment = async ({
  content,
  userId,
  postId,
  commentId,
}: {
  content: string;
  userId: string;
  postId: number;
  commentId: number | undefined;
}) => {
  const { data, error } = await supabase.from('comments').insert([
    {
      content: content,
      user_id: userId,
      post_id: postId,
      parent_id: commentId ?? null,
    },
  ]);

  if (error) {
    console.error('댓글 저장 중 오류 발생:', error);
  }

  return data;
};

export const removeComment = async ({
  commentId,
  userId,
  postId,
}: {
  commentId: number;
  userId: string;
  postId: number;
}) => {
  // 대댓글 ID 조회
  const { data: replyComments, error: fetchReplyError } = await supabase
    .from('comments')
    .select('id')
    .match({ parent_id: commentId });

  if (fetchReplyError) {
    console.error('대댓글 조회 중 오류 발생:', fetchReplyError);
    return;
  }

  // 대댓글의 좋아요 삭제
  for (const replyComment of replyComments) {
    const { error: deleteReplyLikeError } = await supabase
      .from('comment_likes')
      .delete()
      .match({ comment_id: replyComment.id });

    if (deleteReplyLikeError) {
      console.error('대댓글 좋아요 삭제 중 오류 발생:', deleteReplyLikeError);
    }
  }

  // 대댓글 삭제
  const { error: deleteReplyError } = await supabase
    .from('comments')
    .delete()
    .match({ parent_id: commentId });

  if (deleteReplyError) {
    console.error('대댓글 삭제 중 오류 발생:', deleteReplyError);
  }

  // 댓글의 좋아요 삭제
  const { error: deleteCommentLikeError } = await supabase
    .from('comment_likes')
    .delete()
    .match({
      comment_id: commentId,
    });

  if (deleteCommentLikeError) {
    console.error('댓글 좋아요 삭제 중 오류 발생:', deleteCommentLikeError);
  }

  // 댓글 삭제
  const { data: deletedComments, error: deleteCommentError } = await supabase
    .from('comments')
    .delete()
    .match({
      id: commentId,
      user_id: userId,
      post_id: postId,
    });

  if (deleteCommentError) {
    console.error('댓글 삭제 중 오류 발생:', deleteCommentError);
  }

  return deletedComments;
};
