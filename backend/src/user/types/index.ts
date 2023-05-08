export enum UserRole {
  PUBLIC = "PUBLIC",
  COMMUNITY = "COMMUNITY",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewUser = Omit<User, "_id" | "role">;
export type LoginUser = Omit<User, "password"> & {
  accessToken: string;
  refreshToken: string;
};
