import { ReactNode } from "react";

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  dob?: string;
  phone?: string;
  hobby?: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
};

export interface UserData {
  success: boolean;
  data: UserDetails;
  message: string;
}

export interface userContextProviderProps {
  children: ReactNode;
}