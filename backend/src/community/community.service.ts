import ApiError from "../common/api-error";
import { communityApplicationModel } from "./community.model";
import {
  CommunityApplicationStatus,
  CreateCommunityApplicationRequest,
  CreateCommunityApplicationResponse,
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
}

export default CommunityService;
