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
  foodPreferences: string[];
  description: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
  };
  coordinate: {
    latitude: number;
    longitude: number;
  };
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
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
  };
  coordinate: {
    latitude: number;
    longitude: number;
  };
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
