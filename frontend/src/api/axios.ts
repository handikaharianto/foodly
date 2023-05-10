import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosPromise } from "axios";

import { ErrorResponse } from "../utils/types";
import { LoginUserResponse } from "../features/user/types";

export const publicAxios = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const privateAxios = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        // call API endpoint to generate new access token
        const response = await publicAxios.post("/users/refresh", {
          refreshToken,
        });
        const userData: LoginUserResponse = response.data;

        window.localStorage.setItem("refreshToken", userData.refreshToken);
        privateAxios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`;
        return privateAxios(error.config);
      } catch (error) {
        logoutUser();
        return Promise.reject(error);
      }
    }
  }
);

const logoutUser = () => {
  delete privateAxios.defaults.headers.common.Authorization;
  window.localStorage.clear();
  window.location.replace("/sign-in");
};

export const executeAsyncThunk = <T, U>(
  typePrefix: string,
  apiCall: (req: T) => AxiosPromise<U>
) =>
  createAsyncThunk<U, T, { rejectValue: ErrorResponse }>(
    typePrefix,
    async (req, { rejectWithValue }) => {
      try {
        const { data } = await apiCall(req);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response.data as ErrorResponse);
      }
    }
  );
