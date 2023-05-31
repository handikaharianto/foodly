import ApiError from "../common/api-error";
import { communityApplicationModel } from "./community.model";
import {
  CommunityApplicationStatus,
  CreateCommunityApplicationRequest,
  CreateCommunityApplicationResponse,
  GetAllCommunityApplicationsRequest,
  GetAllCommunityApplicationsResponse,
  GetOneCommunityApplicationResponse,
} from "./types";
import HTTP_STATUS from "../common/http-status-code";
import {
  COMMUNITY_APPLICATION_EXISTS_ERROR,
  COMMUNITY_APPLICATION_NOT_FOUND,
} from "../common/error-message";

class CommunityService {
  createCommunityApplication = async (
    communityApplicationData: CreateCommunityApplicationRequest
  ): Promise<CreateCommunityApplicationResponse> => {
    const isCommunityApplicationFound = await communityApplicationModel.findOne(
      {
        user: communityApplicationData.user,
        status: CommunityApplicationStatus.PENDING,
      }
    );
    if (isCommunityApplicationFound)
      throw new ApiError(
        HTTP_STATUS.CONFLICT_409,
        COMMUNITY_APPLICATION_EXISTS_ERROR
      );

    const communityApplication = await communityApplicationModel.create(
      communityApplicationData
    );

    return communityApplication;
  };

  getOneCommunityApplication = async (
    userId: string
  ): Promise<GetOneCommunityApplicationResponse> => {
    const communityApplication = await communityApplicationModel.findOne({
      user: userId,
      status: CommunityApplicationStatus.PENDING,
    });
    if (!communityApplication)
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND_404,
        COMMUNITY_APPLICATION_NOT_FOUND
      );

    return communityApplication;
  };

  getAllCommunityApplications = async (
    limit: number,
    page: number,
    searchInput: string,
    filter: GetAllCommunityApplicationsRequest
  ): Promise<GetAllCommunityApplicationsResponse> => {
    const totalData = await communityApplicationModel.countDocuments(filter);

    const data = await communityApplicationModel
      .find(filter, null, {
        skip: (page - 1) * limit,
        limit,
      })
      .populate("user");

    const currentPage = totalData > limit ? page : 1;
    const totalPages = totalData / limit > 1 ? Math.ceil(totalData / limit) : 1;

    return {
      data,
      currentPage,
      totalPages,
      totalData,
    };
  };

  updateCommunity = async () => {};
}

export default CommunityService;
