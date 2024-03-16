import { UserDataProps } from "./userData";

export interface PostDataProps {
  id: number,
  description: string,
  users_id: number,
  user: UserDataProps,
  updated_at: string,
  created_at: string,
  likes_count: number,
  replies_count: number,
  is_like_post: boolean,
  is_own_post: boolean
}