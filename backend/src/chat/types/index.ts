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
  chat: Types.ObjectId | UserWithoutPassword;
  sender: Types.ObjectId | UserWithoutPassword;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NewMessage = {
  content: string;
  chat: string;
  sender: string;
};
