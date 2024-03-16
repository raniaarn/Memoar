import { ReactNode } from 'react';
import { UserDataProps } from './userData';
import { PostDataProps } from './postData';

export interface NotificationProps {
  id: number;
  remark: string;
  read: boolean
  created_at: string
  updated_at: string
  user: UserDataProps
  posts: PostDataProps
};