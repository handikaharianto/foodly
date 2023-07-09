import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { Notification } from "./types";
import { RootState } from "../../app/store";

export const getAllNotifications = executeAsyncThunk<
  {
    isRead?: boolean;
  },
  Notification[]
>("notification/getAllNotifications", (req) =>
  privateAxios.post("/notifications/list", req)
);

export const updateOneNotification = executeAsyncThunk<
  {
    notificationId: string;
    isRead?: boolean;
  },
  Notification
>("notification/updateOneNotification", (req) =>
  privateAxios.put(`/notifications/${req.notificationId}`, {
    isRead: req.isRead,
  })
);

export const updateManyNotifications = executeAsyncThunk<
  {
    receiver?: string;
    isRead: boolean;
  },
  Notification
>("notification/updateManyNotifications", (req) =>
  privateAxios.put(`/notifications`, req)
);

type NotificationState = {
  notificationList: Notification[];
  isLoading: boolean;
};

const initialState: NotificationState = {
  notificationList: [],
  isLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notificationList.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationList = action.payload;
      })
      .addCase(updateOneNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationList = state.notificationList.filter(
          (notification) => notification._id !== action.payload._id
        );
      })
      .addCase(updateManyNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationList = [];
      })
      .addMatcher(
        isAnyOf(
          getAllNotifications.pending
          //   updateOneNotification.pending,
          //   updateManyNotifications.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      );
    builder.addMatcher(
      isAnyOf(
        getAllNotifications.rejected,
        updateOneNotification.rejected,
        updateManyNotifications.rejected
      ),
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});

export const { addNotification } = notificationSlice.actions;

export const NotificationState = (state: RootState) => state.notification;

export default notificationSlice.reducer;
