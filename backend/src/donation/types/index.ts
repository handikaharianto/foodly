import { Types } from "mongoose";
import { Community } from "src/community/types";
import { UserWithoutPassword } from "src/user/types";

export enum DonationStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type Donation = {
  _id: Types.ObjectId;
  items: DonationItem[];
  status: DonationStatus;
  community: Types.ObjectId | Community;
  donor: Types.ObjectId | UserWithoutPassword;
  createdAt: Date;
  updatedAt: Date;
};

export type DonationItem = {
  name: string;
  quantity: number;
  unit: string;
};

export type NewDonation = {
  items: DonationItem[];
  community: Types.ObjectId | Community;
  donor: Types.ObjectId | UserWithoutPassword;
};
