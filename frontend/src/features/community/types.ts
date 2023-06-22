import { User } from "../user/types";

export type Community = {
  _id: string;
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
  };
  coordinate: {
    latitude: number;
    longitude: number;
  };
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunity = {
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
  };
  coordinate: {
    latitude: number;
    longitude: number;
  };
  user: string;
};

export type UpdateCommunity = {
  communityId: string;
  name: string;
  description: string;
};
