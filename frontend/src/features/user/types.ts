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
  phoneNumber: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  community?: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};
