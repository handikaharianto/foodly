export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewUser = Omit<User, "_id">;
