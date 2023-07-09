import { User, UserRole } from "../user/types";

export type Notification = {
  _id: string;
  content: string;
  isRead: boolean;
  sender: User;
  receiver?: User;
  target: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
