import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "./types";
import { executeAsyncThunk, publicAxios } from "../../api/axios";
import { RootState } from "../../app/store";

export const registerUser = executeAsyncThunk<RegisterUserRequest, void>(
  "user/registerUser",
  (req) => publicAxios.post("/users/register", req)
);

export const loginUser = executeAsyncThunk<LoginUserRequest, LoginUserResponse>(
  "user/loginUser",
  (req) =>
    publicAxios.post("/users/login", req, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
);

export interface UserState {
  loggedInUser: LoginUserResponse | null;
  isLoading: boolean;
}

const initialState: UserState = {
  loggedInUser: null,
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
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = action.payload;

        window.localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

// export const {} = authSlice.actions
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
