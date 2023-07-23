import { Types } from "mongoose";

import { Community } from "src/community/types";

export enum UserRole {
  PUBLIC = "public",
  COMMUNITY = "community",
  ADMINISTRATOR = "administrator",
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  community?: Types.ObjectId | Community;
  createdAt: Date;
  updatedAt: Date;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: UserRole;
};

export type UserWithoutPassword = Omit<User, "password">;
export type LoginUser = UserWithoutPassword & {
  accessToken: string;
  refreshToken: string;
};

export type RefreshToken = {
  _id: string;
  token: string;
  user: Types.ObjectId | string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
