import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { DonationByMonth, DonationStatusStats } from "./types";

export const getUserStats = executeAsyncThunk<void, { total: number }>(
  "dashboard/getUserStats",
  () => privateAxios.get(`/dashboard/total-users`)
);

export const getCommunityStats = executeAsyncThunk<void, { total: number }>(
  "dashboard/getCommunityStats",
  () => privateAxios.get(`/dashboard/total-communities`)
);

export const getDonationStats = executeAsyncThunk<void, { total: number }>(
  "dashboard/getDonationStats",
  () => privateAxios.get(`/dashboard/total-donations`)
);
export const getTotalDonationsByMonth = executeAsyncThunk<
  void,
  DonationByMonth[]
>("dashboard/getTotalDonationsByMonth", () =>
  privateAxios.get(`/dashboard/donations-by-month`)
);

export const getDonationStatus = executeAsyncThunk<void, DonationStatusStats[]>(
  "dashboard/getDonationStatus",
  () => privateAxios.get(`/dashboard/donation-status`)
);

type DashboardState = {
  totalUsers: number | null;
  totalCommunities: number | null;
  totalDonations: number | null;
  donationStatus: DonationStatusStats[];
  donationByMonths: DonationByMonth[];
  isLoading: boolean;
};

const initialState: DashboardState = {
  totalUsers: null,
  totalCommunities: null,
  totalDonations: null,
  donationStatus: [],
  donationByMonths: [],
  isLoading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUsers = action.payload.total;
      })
      .addCase(getCommunityStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCommunities = action.payload.total;
      })
      .addCase(getDonationStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalDonations = action.payload.total;
      })
      .addCase(getTotalDonationsByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donationByMonths = action.payload;
      })
      .addCase(getDonationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donationStatus = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getUserStats.pending,
          getCommunityStats.pending,
          getDonationStats.pending,
          getDonationStatus.pending,
          getTotalDonationsByMonth.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getUserStats.rejected,
          getCommunityStats.rejected,
          getDonationStats.rejected,
          getDonationStatus.rejected,
          getTotalDonationsByMonth.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const dashboardState = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
