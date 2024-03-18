export interface UserType {
  avatar_url: string;
  created_at: string;
  email: string;
  id: number;
  user_name: string;
  uuid: string;
  user_intro: string;
}

export interface SearchedUser extends UserType {
  follows: { follower_id: string }[];
}
