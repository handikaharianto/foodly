import { User } from "../user/types";

export type Community = {
  _id: string;
  name: string;
  type: string;
  description: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunity = {
  name: string;
  type: string;
  description: string;
  user: string;
};

export type UpdateCommunity = {
  communityId: string;
  name: string;
  description: string;
};
