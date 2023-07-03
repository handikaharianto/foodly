import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  Donation,
  GetAllDonations,
  NewDonation,
  UpdateOneDonation,
} from "./types";
import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { PaginatedData } from "../../utils/types";
import { RootState } from "../../app/store";

export const createDonation = executeAsyncThunk<NewDonation, void>(
  "donation/createDonation",
  (req) => privateAxios.post("/donations", req)
);

export const getAllDonations = executeAsyncThunk<
  GetAllDonations,
  PaginatedData<Donation>
>("donation/getAllDonations", (req) =>
  privateAxios.post("/donations/list", req)
);

export const updateOneDonation = executeAsyncThunk<UpdateOneDonation, Donation>(
  "donation/updateOneDonation",
  (req) =>
    privateAxios.post(`/donations/${req.donationId}`, {
      status: req.status,
      items: req.items,
    })
);

export const getOneDonation = executeAsyncThunk<
  { donationId: string },
  Donation
>("donation/getOneDonation", (req) =>
  privateAxios.post(`/donations/${req.donationId}`)
);

export type DonationState = {
  donation: Donation | null;
  donationList: Donation[];
  currentPage: number | null;
  totalPages: number | null;
  totalData: number | null;
  isLoading: boolean;
};

const initialState: DonationState = {
  donation: null,
  donationList: [],
  currentPage: null,
  totalPages: null,
  totalData: null,
  isLoading: false,
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDonation.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donationList = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalData = action.payload.totalData;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(updateOneDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donation = action.payload;
      })
      .addCase(getOneDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donation = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createDonation.pending,
          getAllDonations.pending,
          updateOneDonation.pending,
          getOneDonation.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createDonation.rejected,
          getAllDonations.rejected,
          updateOneDonation.rejected,
          getOneDonation.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const donationState = (state: RootState) => state.donation;

export default donationSlice.reducer;
