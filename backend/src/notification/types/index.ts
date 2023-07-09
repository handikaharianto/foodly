import { Types } from "mongoose";
import { UserRole, UserWithoutPassword } from "src/user/types";

export type Notification = {
  _id: string;
  content: string;
  isRead: boolean;
  sender: Types.ObjectId | UserWithoutPassword;
  receiver?: Types.ObjectId | UserWithoutPassword;
  target: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type NewNotification = {
  content: string;
  sender: string;
  receiver?: string;
  target: UserRole;
};
