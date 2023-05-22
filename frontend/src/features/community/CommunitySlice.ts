import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { executeAsyncThunk } from "../../api/axios";
import {
  createCommunityApplicationRequest,
  createCommunityApplicationResponse,
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
>("community/createCommunityApplication", (req) =>
  privateAxios.post("/community/application", req)
);

export const getOneCommunityApplication = executeAsyncThunk<
  void,
  getOneCommunityApplicationResponse
>("community/getOneCommunityApplication", () =>
  privateAxios.get("/community/application")
);

export interface CommunityState {
  communityApplication: getOneCommunityApplicationResponse | null;
  isLoading: boolean;
}

const initialState: CommunityState = {
  communityApplication: null,
  isLoading: false,
};

export const communitySlice = createSlice({
  name: "community",
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
      .addMatcher(
        isAnyOf(
          createCommunityApplication.pending,
          getOneCommunityApplication.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(getOneCommunityApplication.rejected),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const communityState = (state: RootState) => state.community;

export default communitySlice.reducer;
