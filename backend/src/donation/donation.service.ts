import communityModel from "../community/community.model";
import { Donation, DonationStatus, NewDonation } from "./types";
import ApiError from "../common/api-error";
import HTTP_STATUS from "../common/http-status-code";
import {
  COMMUNITY_NOT_FOUND,
  DONATION_NOT_FOUND,
  USER_NOT_FOUND,
} from "../common/error-message";
import { userModel } from "../user/user.model";
import donationModel from "./donation.model";
import { PaginatedData } from "../common/types";
import setPagination from "../utils/pagination";
import { Community } from "../community/types";
import { UserWithoutPassword } from "../user/types";

class DonationService {
  createDonation = async (donationData: NewDonation): Promise<void> => {
    const user = await userModel.findById(donationData.donor);
    if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, USER_NOT_FOUND);

    const community = await communityModel.findById(donationData.community);
    if (!community)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, COMMUNITY_NOT_FOUND);

    await donationModel.create({
      ...donationData,
      status: DonationStatus.PENDING,
    });
  };

  getAllDonations = async (
    filter: Partial<Pick<Donation, "community" | "donor" | "status">>,
    limit: number,
    page: number
  ): Promise<PaginatedData<Donation>> => {
    const paginationData = await setPagination(
      donationModel,
      limit,
      page,
      filter
    );

    const data = await donationModel
      .find(filter, null, {
        skip: (page - 1) * limit,
        limit,
      })
      .populate<{ community: Community }>({
        path: "community",
      })
      .populate<{ donor: UserWithoutPassword }>({
        path: "donor",
        select: "-password",
      });

    return {
      data,
      ...paginationData,
    };
  };

  updateOneDonation = async (
    donationId: string,
    donationData: Partial<Pick<Donation, "status" | "items">>
  ): Promise<Donation> => {
    const donation = await donationModel
      .findByIdAndUpdate(donationId, donationData, {
        runValidators: true,
        new: true,
      })
      .populate<{ community: Community }>({
        path: "community",
      })
      .populate<{ donor: UserWithoutPassword }>({
        path: "donor",
        select: "-password",
      });
    if (!donation)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, DONATION_NOT_FOUND);

    return donation;
  };

  getOneDonation = async (donationId: string): Promise<Donation> => {
    const donation = await donationModel
      .findById(donationId)
      .populate<{ community: Community }>({
        path: "community",
      })
      .populate<{ donor: UserWithoutPassword }>({
        path: "donor",
        select: "-password",
      });
    if (!donation)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, DONATION_NOT_FOUND);

    return donation;
  };

  deleteOneDonation = async (donationId: string): Promise<void> => {
    const donation = await donationModel.findByIdAndDelete(donationId);
    if (!donation)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, DONATION_NOT_FOUND);
  };
}

export default DonationService;
