import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { executeAsyncThunk } from "../../api/axios";
import {
  createCommunityApplicationRequest,
  createCommunityApplicationResponse,
  getOneCommunityApplicationResponse,
} from "./types";
import { privateAxios } from "../../api/axios";
import { RootState } from "../../app/store";

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
      })
      .addCase(getOneCommunityApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityApplication = action.payload;
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
        isAnyOf(
          createCommunityApplication.rejected,
          getOneCommunityApplication.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const communityState = (state: RootState) => state.community;

export default communitySlice.reducer;
