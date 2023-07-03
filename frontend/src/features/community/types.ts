import { User } from "../user/types";

export type Community = {
  _id: string;
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: CommunityAddress;
  coordinate: CommunityCoordinate;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunity = {
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: CommunityAddress;
  coordinate: CommunityCoordinate;
  user: string;
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

export type UpdateCommunity = {
  communityId: string;
  name: string;
  description: string;
};
