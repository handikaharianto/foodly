import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { executeAsyncThunk } from "../../api/axios";
import {
  CommunityApplication,
  createCommunityApplicationRequest,
  createCommunityApplicationResponse,
  getAllCommunityApplicationsRequest,
  getAllCommunityApplicationsResponse,
  getOneCommunityApplicationRequest,
  getOneCommunityApplicationResponse,
} from "./types";
import { privateAxios } from "../../api/axios";
import { RootState } from "../../app/store";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";
import { CommunityApplicationStatus } from "./types";

export const createCommunityApplication = executeAsyncThunk<
  createCommunityApplicationRequest,
  createCommunityApplicationResponse
>("communityApplication/createCommunityApplication", (req) =>
  privateAxios.post("/community-applications", req)
);

export const getOneCommunityApplication = executeAsyncThunk<
  getOneCommunityApplicationRequest,
  getOneCommunityApplicationResponse
>("communityApplication/getOneCommunityApplication", (req) =>
  privateAxios.get(`/community-applications/${req.communityApplicationId}`)
);

export const getAllCommunityApplications = executeAsyncThunk<
  getAllCommunityApplicationsRequest,
  getAllCommunityApplicationsResponse
>("communityApplication/getAllCommunityApplications", (req) =>
  privateAxios.post("/community-applications/list", req)
);

export const updateOneCommunityApplication = executeAsyncThunk<
  { communityApplicationId: string; status?: CommunityApplicationStatus },
  CommunityApplication
>("communityApplication/updateOneCommunityApplication", (req) =>
  privateAxios.put(`/community-applications/${req.communityApplicationId}`, {
    status: req.status,
  })
);

export interface communityApplicationState {
  communityApplication: getOneCommunityApplicationResponse | null;
  communityApplications: CommunityApplication[];
  currentPage: number | null;
  totalPages: number | null;
  totalData: number | null;
  isLoading: boolean;
}

const initialState: communityApplicationState = {
  communityApplication: null,
  communityApplications: [],
  currentPage: null,
  totalPages: null,
  totalData: null,
  isLoading: false,
};

export const communityApplicationSlice = createSlice({
  name: "communityApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommunityApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityApplication = action.payload;
        showNotification({
          message:
            "Community application form has successfully been submitted.",
          variant: NotificationVariant.SUCCESS,
        });
      })
      .addCase(getOneCommunityApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityApplication = action.payload;
      })
      .addCase(createCommunityApplication.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllCommunityApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityApplications = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(updateOneCommunityApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityApplication = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createCommunityApplication.pending,
          getOneCommunityApplication.pending,
          getAllCommunityApplications.pending,
          updateOneCommunityApplication.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getOneCommunityApplication.rejected,
          getAllCommunityApplications.rejected,
          updateOneCommunityApplication.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          showNotification({
            message: action.payload?.error as string,
            variant: NotificationVariant.ERROR,
          });
        }
      );
  },
});

export const communityApplicationState = (state: RootState) =>
  state.communityApplication;

export default communityApplicationSlice.reducer;
