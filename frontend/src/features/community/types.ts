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
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type getOneCommunityApplicationResponse =
  createCommunityApplicationResponse;
