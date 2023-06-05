import { model, Schema } from "mongoose";

import { CommunityApplication, CommunityApplicationStatus } from "./types";

const communityApplicationSchema = new Schema<CommunityApplication>(
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

const communityApplicationModel = model<CommunityApplication>(
  "CommunityApplication",
  communityApplicationSchema
);

export default communityApplicationModel;
