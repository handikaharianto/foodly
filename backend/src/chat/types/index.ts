import { Types } from "mongoose";
import { UserWithoutPassword } from "src/user/types";

export type Chat = {
  _id: string;
  latestMessage: Types.ObjectId | Message;
  users: Types.ObjectId[] | UserWithoutPassword[];
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  _id: string;
  chat: Types.ObjectId | Chat;
  sender: Types.ObjectId | UserWithoutPassword;
  content: string;
  isRead: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type NewMessage = {
  content: string;
  chat: string;
  sender: string;
};
