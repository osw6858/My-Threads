import { UserType } from './user';

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
  post_likes: { user_id: string }[];
}

interface CommentLieks {
  id: number;
  created_at: string;
  user_id: string;
  comment_id: number;
}

export interface CommentType {
  id: number;
  comment_likes: CommentLieks[];
  content: string;
  created_at: string;
  post_id: number;
  user_id: string;
  parent_id: number;
  replies: CommentType[];
  users: { avatar_url: string; id: number; user_name: string };
}
