import { Types } from "mongoose";
import { UserWithoutPassword } from "src/user/types";

export enum CommunityApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type CommunityApplication = {
  _id: string;
  name: string;
  type: string;
  description: string;
  status: CommunityApplicationStatus;
  user: Types.ObjectId | UserWithoutPassword;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunityApplication = {
  name: string;
  type: string;
  description: string;
  user: string;
};
