import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Community, UpdateCommunity, NewCommunity } from "./types";
import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { PaginatedData } from "../../utils/types";
import { RootState } from "../../app/store";
import { showNotification } from "../../utils/notifications";
import { NotificationVariant } from "../../utils/notifications";

export const createCommunity = executeAsyncThunk<NewCommunity, Community>(
  "community/createCommunity",
  (req) => privateAxios.post("/communities", req)
);

export const getAllCommunities = executeAsyncThunk<
  { limit: number; page: number; searchInput: string },
  PaginatedData<Community>
>("community/getAllCommunities", (req) =>
  privateAxios.post("/communities/list", req)
);

export const getOneCommunity = executeAsyncThunk<
  { communityId: string },
  Community
>("community/getOneCommunity", (req) =>
  privateAxios.get(`/communities/${req.communityId}`)
);

export const updateOneCommunity = executeAsyncThunk<UpdateCommunity, Community>(
  "community/updateOneCommunity",
  (req) =>
    privateAxios.put(`/communities/${req.communityId}`, {
      name: req.name,
      description: req.description,
    })
);

type CommunityState = {
  community: Community | null;
  communityList: Community[];
  currentPage: number;
  totalPages: number;
  totalData: number;
  isLoading: boolean;
};

const initialState: CommunityState = {
  community: null,
  communityList: [],
  currentPage: 0,
  totalPages: 0,
  totalData: 0,
  isLoading: false,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        showNotification({
          message: "Community has successfully been accepted!",
          variant: NotificationVariant.SUCCESS,
        });
      })
      .addCase(getAllCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityList = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(getOneCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.community = action.payload;
      })
      .addCase(updateOneCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.community = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createCommunity.pending,
          getAllCommunities.pending,
          getOneCommunity.pending,
          updateOneCommunity.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createCommunity.rejected,
          getAllCommunities.rejected,
          getOneCommunity.rejected,
          updateOneCommunity.rejected
        ),
        (state, action) => {
          state.isLoading = true;
        }
      );
  },
});

export const communityState = (state: RootState) => state.community;

export default communitySlice.reducer;
