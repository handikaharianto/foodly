import { Types } from "mongoose";
import { UserWithoutPassword } from "src/user/types";

export type Community = {
  _id: string;
  name: string;
  type: string;
  description: string;
  user: Types.ObjectId | UserWithoutPassword;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunity = {
  name: string;
  type: string;
  description: string;
  user: string;
};
