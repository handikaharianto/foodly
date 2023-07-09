import { Types } from "mongoose";
import { UserWithoutPassword } from "src/user/types";

export type Notification = {
  _id: string;
  content: string;
  isRead: boolean;
  sender: Types.ObjectId | UserWithoutPassword;
  receiver: Types.ObjectId | UserWithoutPassword;
  createdAt: Date;
  updatedAt: Date;
};

export type NewNotification = {
  content: string;
  sender: string;
  receiver: string;
};
