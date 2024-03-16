export interface UserType {
  avatar_url: string;
  created_at: string;
  email: string;
  id: number;
  user_name: string;
  uuid: string;
}

export interface ImageType {
  post_id: number;
  image_id: number;
  image_url: string;
}

export interface PostType {
  comments: { id: number }[];
  content: string;
  created_at: string;
  images: ImageType[];
  post_id: number;
  user_id: number;
  users: UserType;
  likes: { user_id: string }[];
}

export interface CommentType {
  id: number;
  content: string;
  created_at: string;
  post_id: number;
  user_id: string;
  users: { avatar_url: string; id: number; user_name: string };
}
