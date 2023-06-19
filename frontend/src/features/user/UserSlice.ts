import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "./types";
import { executeAsyncThunk, privateAxios, publicAxios } from "../../api/axios";
import { RootState } from "../../app/store";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";

export const registerUser = executeAsyncThunk<RegisterUserRequest, void>(
  "user/registerUser",
  (req) => publicAxios.post("/users/register", req)
);

export const loginUser = executeAsyncThunk<LoginUserRequest, LoginUserResponse>(
  "user/loginUser",
  async (req) => {
    const response = await publicAxios.post("/users/login", req);
    const data = (await response.data) as LoginUserResponse;

    window.localStorage.setItem("refreshToken", data.refreshToken);
    return response;
  }
);

export const refreshAccessToken = executeAsyncThunk<
  { refreshToken: string },
  LoginUserResponse
>("refreshAccessToken", (req) => publicAxios.post("/users/refresh", req));

export const testPage = executeAsyncThunk<void, void>("user/testPage", () => {
  return privateAxios.get("/users/test");
});

interface UserState {
  loggedInUser: LoginUserResponse | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  loggedInUser: null,
  isLoggedIn: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        showNotification({
          message: "User has successfully been registered.",
          variant: NotificationVariant.SUCCESS,
        });
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = action.payload;
        state.isLoggedIn = true;
        showNotification({
          message: "User has successfully logged in.",
          variant: NotificationVariant.SUCCESS,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        showNotification({
          message: action.payload?.error as string,
          variant: NotificationVariant.ERROR,
        });
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          refreshAccessToken.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(isAnyOf(registerUser.rejected), (state, action) => {
        state.isLoading = false;
        showNotification({
          message: action.payload?.error as string,
          variant: NotificationVariant.ERROR,
        });
      });
  },
});

// export const {} = authSlice.actions
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
