import { User } from "../user/types";

export type Notification = {
  _id: string;
  content: string;
  isRead: boolean;
  sender: User;
  receiver: User;
  createdAt: Date;
  updatedAt: Date;
};
