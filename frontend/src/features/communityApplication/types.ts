import { User } from "../user/types";

export enum CommunityApplicationStatus {
  ALL = "ALL",
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
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type createCommunityApplicationRequest = {
  name: string;
  type: string;
  description: string;
};

export type createCommunityApplicationResponse = {
  _id: string;
  name: string;
  type: string;
  description: string;
  status: CommunityApplicationStatus;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type getOneCommunityApplicationRequest = {
  communityApplicationId: string;
};

export type getOneCommunityApplicationResponse =
  createCommunityApplicationResponse;

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
