import { Dispatch, SetStateAction } from "react";
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
  is_own_post: boolean,
}

export interface CardPostProps {
  id: number,
  description: string,
  users_id: number,
  user: UserDataProps,
  updated_at: string,
  created_at: string,
  likes_count: number,
  replies_count: number,
  is_like_post: boolean,
  is_own_post: boolean,
  onClickEdit: () => void,
  onClickDelete: () => void,
  setId: Dispatch<any>
  setPost: Dispatch<SetStateAction<{
    description: string;
  }>>
}

export interface PostIdProps {
  id: number
  description: string
  onClickEdit: () => void,
  onClickDelete: () => void,
  setId: Dispatch<any>
  setPost: Dispatch<SetStateAction<{
    description: string;
  }>>
}

export interface ReplyDataProps {
  id: number,
  description: string,
  posts_id: number,
  users_id: number,
  deleted_at: string,
  user: UserDataProps,
  updated_at: string,
  created_at: string,
  is_own_reply: boolean
}