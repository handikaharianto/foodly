export enum UserRole {
  PUBLIC = "PUBLIC",
  COMMUNITY = "COMMUNITY",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
