import { model, Schema } from "mongoose";
import {
  CommunitySchema,
  CommunityApplicationSchema,
  CommunityApplicationStatus,
  CommunityApplicationModel,
  CommunityModel,
} from "./types";

const communitySchema = new Schema<CommunitySchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const communityApplicationSchema = new Schema<CommunityApplicationSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,

    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(CommunityApplicationStatus),
      default: CommunityApplicationStatus.PENDING,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const communityModel = model<CommunityModel>(
  "Community",
  communitySchema
);

export const communityApplicationModel = model<CommunityApplicationModel>(
  "CommunityApplication",
  communityApplicationSchema
);
