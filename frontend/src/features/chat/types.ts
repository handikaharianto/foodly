import { User } from "../user/types";

export type Chat = {
  _id: string;
  latestMessage: null | Message;
  users: User[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  content: string;
  sender: User;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
};
