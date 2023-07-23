import donationModel from "../donation/donation.model";
import communityModel from "../community/community.model";
import { userModel } from "../user/user.model";
import { DonationStatus } from "../donation/types";

class DashboardService {
  getTotalUsers = async () => {
    const totalUsers = await userModel.countDocuments();

    return {
      total: totalUsers,
    };
  };

  getTotalCommunities = async () => {
    const totalCommunities = await communityModel.countDocuments();

    return {
      total: totalCommunities,
    };
  };

  getTotalDonations = async () => {
    const totalDonations = await donationModel.countDocuments({
      status: DonationStatus.RECEIVED,
    });

    return {
      total: totalDonations,
    };
  };

  getTotalDonationsByMonth = async () => {
    const date = new Date();
    const sixMonthsAgo = new Date(date.setMonth(date.getMonth() - 6));
    const sixMonthsAgoYear = new Date(sixMonthsAgo).getFullYear();

    const dateSixMonthsAgo = new Date(
      sixMonthsAgoYear,
      sixMonthsAgo.getMonth(),
      1
    );

    const donations = await donationModel.aggregate([
      {
        $match: {
          status: DonationStatus.RECEIVED,
          createdAt: {
            $gt: dateSixMonthsAgo,
            $lte: new Date(),
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
        },
      },
    ]);

    const standardizedData = [];
    for (let i = 0; i <= new Date().getMonth(); i++) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const donationByMonth = donations.find(
        (donation) => donation._id === i + 1
      );

      standardizedData.push({
        month: months[i],
        count: donationByMonth ? donationByMonth.count : 0,
      });
    }

    return standardizedData;
  };

  getDonationStatus = async () => {
    const donations = await donationModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const standardizedData = Object.values(DonationStatus).map((status) => {
      const statusFound = donations.find((donation) => donation._id === status);
      if (statusFound) {
        return {
          status,
          count: statusFound.count,
        };
      }
      return {
        status,
        count: 0,
      };
    });

    return standardizedData;
  };
}

export default DashboardService;
