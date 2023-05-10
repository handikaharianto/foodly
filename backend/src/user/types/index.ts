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
export type UserWithoutPassword = Omit<User, "password">;
export type LoginUser = UserWithoutPassword & {
  accessToken: string;
  refreshToken: string;
};

export interface RefreshToken {
  _id: string;
  token: string;
  user: string;
  expirationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
