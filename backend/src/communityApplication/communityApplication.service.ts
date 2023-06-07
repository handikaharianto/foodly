import ApiError from "../common/api-error";
import {
  CommunityApplication,
  CommunityApplicationStatus,
  NewCommunityApplication,
} from "./types";
import HTTP_STATUS from "../common/http-status-code";
import {
  COMMUNITY_APPLICATION_EXISTS_ERROR,
  COMMUNITY_APPLICATION_NOT_FOUND,
} from "../common/error-message";
import communityApplicationModel from "./communityApplication.model";
import { PaginatedData } from "src/common/types";
import { User, UserWithoutPassword } from "src/user/types";

class CommunityApplicationService {
  createCommunityApplication = async (
    communityApplicationData: NewCommunityApplication
  ): Promise<CommunityApplication> => {
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

  getAllCommunityApplications = async (
    limit: number,
    page: number,
    searchInput: string,
    filter: Pick<CommunityApplication, "status" | "user">
  ): Promise<PaginatedData<CommunityApplication>> => {
    const totalData = await communityApplicationModel.countDocuments(filter);

    const data = await communityApplicationModel
      .find(filter, null, {
        skip: (page - 1) * limit,
        limit,
      })
      .populate<{ user: UserWithoutPassword }>({
        path: "user",
        select: "-password",
      });

    const currentPage = totalData > limit ? page : 1;
    const totalPages = totalData / limit > 1 ? Math.ceil(totalData / limit) : 1;

    return {
      data,
      currentPage,
      totalPages,
      totalData,
    };
  };

  getOneCommunityApplication = async (
    communityApplicationId: string
  ): Promise<CommunityApplication> => {
    const communityApplication = await communityApplicationModel
      .findById(communityApplicationId)
      .populate<{ user: UserWithoutPassword }>({
        path: "user",
        select: "-password",
      });
    if (!communityApplication)
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND_404,
        COMMUNITY_APPLICATION_NOT_FOUND
      );

    return communityApplication;
  };
}

export default CommunityApplicationService;
