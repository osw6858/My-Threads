import { supabase } from '../_supabase/supabaseClient';

export const getAllPost = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
    *,
    users(*),
    images(*)
  `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  }
  return data;
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
