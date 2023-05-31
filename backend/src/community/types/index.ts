import { Types } from "mongoose";

export enum CommunityApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

/**
 * SCHEMA
 */
export interface CommunitySchema {
  name: string;
  type: string;
  description: string;
  user: Types.ObjectId;
}

export type CommunityApplicationSchema = CommunitySchema & { status: string };

/**
 * MODEL
 */
export type CommunityModel = CommunitySchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type CommunityApplicationModel = CommunityApplicationSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * QUERY
 */
export interface CreateCommunityApplicationRequest {
  name: string;
  type: string;
  description: string;
  user: string;
}

export type CreateCommunityApplicationResponse = CommunityApplicationModel;

export type GetOneCommunityApplicationResponse =
  CreateCommunityApplicationResponse;

export type GetAllCommunityApplicationsRequest = {
  status: CommunityApplicationStatus;
};

export type GetAllCommunityApplicationsResponse = {
  data: CommunityApplicationModel[];
  totalData: number;
  currentPage: number;
  totalPages: number;
};
