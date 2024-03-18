import { UserType } from './user';

export interface ActiveType {
  active_user: string;
  content: string;
  created_at: string;
  id: number;
  target_user: string;
  type: string;
  users: UserType;
  post_id: number;
}
