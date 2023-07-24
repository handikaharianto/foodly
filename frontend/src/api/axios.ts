import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosPromise } from "axios";

import { ErrorResponse } from "../utils/types";

export const publicAxios = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const privateAxios = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://foodly-app-api.onrender.com"
    : "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
