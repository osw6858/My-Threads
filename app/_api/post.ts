import { supabase } from '../_supabase/supabaseClient';
import { CommentType } from '../_types/post';

export const getFollowedUsersPosts = async (
  userId: string,
  page = 1,
  limit = 5,
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit - 1;

  const { data: followedUsers, error: followError } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  if (followError) {
    console.error(followError);
    return { data: null, error: followError };
  }

  if (!followedUsers || followedUsers.length === 0) {
    return { data: [], error: null, count: 0 };
  }

  const followedUserIds =
    followedUsers && followedUsers.map((user) => user.following_id);

  const userIdsIncludingUser = [...followedUserIds, userId];

  const { data, error, count } = await supabase
    .from('posts')
    .select(
      `
        *,
        users(*),
        images(*),
        post_likes(user_id),
        comments(id)
      `,
      { count: 'exact' },
    )
    .in('user_id', userIdsIncludingUser)
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);

    return { data: null, error };
  }

  return { data, error, count };
};

export const uploadImage = async (fileData: { image: File; uuid: string }) => {
  // TODO: 한글파일에 대한 대응 방법 변경 필요.
  const fileName = fileData.image.name.replace(/[^a-zA-Z0-9_.-]/g, '_');

  const currentTimeInSeconds = Math.floor(
    new Date().getTime() / 1000,
  ).toString();

  const filePath = `post/${fileName}${currentTimeInSeconds}${fileData.uuid}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, fileData.image);

  if (error) console.error('Error uploading file:', error.message);

  return { data, error };
};

export const uploadPost = async (postData: {
  content: string;
  userId: string;
  imageUrl: string[];
}) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content: postData.content, user_id: postData.userId }])
    .select();

  if (error) {
    console.error('게시글 작성중 문제 발생', error);
  }

  if (data) {
    const postId = data[0].post_id;
    const imageData = postData.imageUrl.map((url: string) => {
      return { image_url: url, post_id: postId };
    });
    const { error } = await supabase.from('images').insert(imageData);
    if (error) {
      console.error('이미지 업로드중 문제 발생', error);
    }
  }
};

export const removePost = async ({
  postId,
  uuid,
}: {
  postId: number;
  uuid: string;
}) => {
  const { data: comments, error: commentError } = await supabase
    .from('comments')
    .delete()
    .match({ post_id: postId });

  const { data: likes, error: likeError } = await supabase
    .from('post_likes')
    .delete()
    .match({ post_id: postId });

  const { data: image, error: imageError } = await supabase
    .from('images')
    .delete()
    .match({ post_id: postId });

  const { data: post, error: postError } = await supabase
    .from('posts')
    .delete()
    .match({ post_id: postId, user_id: uuid });

  if (commentError || likeError || imageError || postError) {
    console.error(
      '포스트 삭제중 문제 발생',
      commentError,
      likeError,
      imageError,
      postError,
    );
  }

  return { comments, likes, image, post };
};

export const getSelectedPost = async (postId: number | undefined) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        *,
        users(*),
        images(*),
        post_likes(user_id),
        comments(user_id)
      `,
    )
    .eq('post_id', postId)
    .single();

  if (error) {
    console.error('게시글 불러오는 중 문제 발생', error);
  }

  return { data, error };
};

export const getUserPost = async (uuId: string, page = 1, limit = 5) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select(
      `
        *,
        users(*),
        images(*),
        post_likes(user_id),
        comments(id)
       
      `,
      { count: 'exact' },
    )
    .eq('user_id', uuId)
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    return { data: null, error };
  }
  return { data, error, count };
};

export const searchPost = async (query: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        *,
        users(*),
        images(*),
        post_likes(user_id),
        comments(id)
      `,
    )
    .ilike('content', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('포스팅 검색중 에러 발생', error);
  }

  return { data, error };
};
