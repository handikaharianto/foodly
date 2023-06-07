import ApiError from "../common/api-error";
import communityModel from "./community.model";
import { Community, NewCommunity } from "./types";
import HTTP_STATUS from "../common/http-status-code";
import {
  COMMUNITY_EXISTS_FOR_USER,
  COMMUNITY_NOT_FOUND,
} from "../common/error-message";
import { UserWithoutPassword } from "../user/types";
import setPagination from "../utils/pagination";
import { PaginatedData } from "../common/types";

class CommunityService {
  createCommunity = async (communityData: NewCommunity): Promise<void> => {
    const communityFound = await communityModel.findOne({
      user: communityData.user,
    });
    if (communityFound)
      throw new ApiError(HTTP_STATUS.CONFLICT_409, COMMUNITY_EXISTS_FOR_USER);

    await communityModel.create(communityData);
  };

  getAllCommunities = async (
    limit: number,
    page: number
  ): Promise<PaginatedData<Community>> => {
    const paginationData = await setPagination(communityModel, limit, page);

    const data = await communityModel
      .find({}, null, {
        skip: (page - 1) * limit,
        limit,
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

  getOneCommunity = async (communityId: string): Promise<Community> => {
    const community = await communityModel
      .findById(communityId)
      .populate<{ user: UserWithoutPassword }>({
        path: "user",
        select: "-password",
      });
    if (!community)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, COMMUNITY_NOT_FOUND);

    return community;
  };

  updateOneCommunity = async (
    communityId: string,
    communityData: Pick<Community, "name" | "description">
  ): Promise<Community> => {
    const community = await communityModel
      .findByIdAndUpdate(communityId, communityData, {
        new: true,
        runValidators: true,
      })
      .populate<{ user: UserWithoutPassword }>({
        path: "user",
        select: "-password",
      });
    if (!community)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, COMMUNITY_NOT_FOUND);

    return community;
  };
}

export default CommunityService;
