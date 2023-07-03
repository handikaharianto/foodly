import { Community } from "../community/types";
import { User } from "../user/types";

export enum DonationStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type Donation = {
  _id: string;
  items: DonationItem[];
  status: DonationStatus;
  community: Community;
  donor: User;
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
  community: string;
  donor: string;
};

export type GetAllDonations = {
  community?: string;
  donor?: string;
  limit: number;
  page: number;
};

export type UpdateOneDonation = {
  donationId: string;
  status?: DonationStatus;
  items?: DonationItem[];
};
