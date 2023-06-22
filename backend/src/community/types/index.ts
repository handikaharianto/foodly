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

export type CommunityAddress = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
};

export type CommunityCoordinate = {
  latitude: number;
  longitude: number;
};

export type NewCommunity = {
  name: string;
  type: string;
  description: string;
  user: string;
};
