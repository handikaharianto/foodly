import { Schema, model } from "mongoose";

import { Notification } from "./types";

const notificationSchema = new Schema<Notification>(
  {
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const notificationModel = model<Notification>(
  "Notification",
  notificationSchema
);

export default notificationModel;
