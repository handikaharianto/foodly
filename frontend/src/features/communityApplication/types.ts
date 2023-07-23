import { CommunityAddress, CommunityCoordinate } from "../community/types";
import { User } from "../user/types";

export enum CommunityApplicationStatus {
  ALL = "all",
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
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type NewCommunityApplication = {
  name: string;
  type: string;
  foodPreferences: string[];
  description: string;
  address: CommunityAddress;
  coordinate: CommunityCoordinate;
};

export type getOneCommunityApplicationRequest = {
  communityApplicationId: string;
};

export type getAllCommunityApplicationsRequest = {
  status?: CommunityApplicationStatus;
  searchInput?: string;
  limit?: number;
  page?: number;
};

export type getAllCommunityApplicationsResponse = {
  data: CommunityApplication[];
  currentPage: number;
  totalPages: number;
  totalData: number;
};
