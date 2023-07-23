import { Types } from "mongoose";

import { CommunityAddress, CommunityCoordinate } from "src/community/types";
import { UserWithoutPassword } from "src/user/types";

export enum CommunityApplicationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type CommunityApplication = {
  _id: string;
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: CommunityAddress;
  coordinate: CommunityCoordinate;
  status: CommunityApplicationStatus;
  user: Types.ObjectId | UserWithoutPassword;
  createdAt: Date;
  updatedAt: Date;
};

export type NewCommunityApplication = {
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: CommunityAddress;
  coordinate: CommunityCoordinate;
  user: string;
};
