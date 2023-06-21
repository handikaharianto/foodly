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
import { UserWithoutPassword } from "src/user/types";
import { setMongoRegex } from "../utils/regex";
import setPagination from "../utils/pagination";

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
    status: CommunityApplicationStatus,
    filter: Pick<CommunityApplication, "status" | "user">
  ): Promise<PaginatedData<CommunityApplication>> => {
    let query: any = filter;
    // add search input to query
    if (searchInput) {
      query.name = setMongoRegex(searchInput);
    }

    // add status to query
    if (status) {
      query.status = status;
    }

    const paginationData = await setPagination(
      communityApplicationModel,
      limit,
      page,
      query
    );

    const data = await communityApplicationModel
      .find(query, null, {
        skip: (page - 1) * limit,
        limit,
        sort: "createdAt",
      })
      .populate<{ user: UserWithoutPassword }>({
        path: "user",
        select: "-password",
      });

    return {
      data,
      ...paginationData,
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

  updateOneCommunityApplication = async (
    communityApplicationId: string,
    communityApplicationData: Pick<CommunityApplication, "status">
  ): Promise<CommunityApplication> => {
    const communityApplication =
      await communityApplicationModel.findByIdAndUpdate(
        communityApplicationId,
        communityApplicationData,
        { runValidators: true, new: true }
      );
    if (!communityApplication)
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND_404,
        COMMUNITY_APPLICATION_NOT_FOUND
      );

    return communityApplication;
  };
}

export default CommunityApplicationService;
