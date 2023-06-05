import { Types } from "mongoose";

export enum UserRole {
  PUBLIC = "PUBLIC",
  COMMUNITY = "COMMUNITY",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
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
