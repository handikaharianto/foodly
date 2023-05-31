import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { executeAsyncThunk } from "../../api/axios";
import {
  CommunityApplication,
  createCommunityApplicationRequest,
  createCommunityApplicationResponse,
  getAllCommunityApplicationsRequest,
  getAllCommunityApplicationsResponse,
  getOneCommunityApplicationResponse,
} from "./types";
import { privateAxios } from "../../api/axios";
import { RootState } from "../../app/store";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";

export const createCommunityApplication = executeAsyncThunk<
  createCommunityApplicationRequest,
  createCommunityApplicationResponse
>("communityApplication/createCommunityApplication", (req) =>
  privateAxios.post("/community/applications", req)
);

export const getOneCommunityApplication = executeAsyncThunk<
  void,
  getOneCommunityApplicationResponse
>("communityApplication/getOneCommunityApplication", () =>
  privateAxios.get("/community/applications")
);

export const getAllCommunityApplications = executeAsyncThunk<
  getAllCommunityApplicationsRequest,
  getAllCommunityApplicationsResponse
>("communityApplication/getAllCommunityApplications", (req) =>
  privateAxios.post("/community/applications/list", req)
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
      .addMatcher(
        isAnyOf(
          createCommunityApplication.pending,
          getOneCommunityApplication.pending,
          getAllCommunityApplications.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getOneCommunityApplication.rejected,
          getAllCommunityApplications.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const communityApplicationState = (state: RootState) =>
  state.communityApplication;

export default communityApplicationSlice.reducer;
