import { model, Schema } from "mongoose";

import { CommunityApplication, CommunityApplicationStatus } from "./types";
import {
  communityAddressSchema,
  communityCoordinateSchema,
} from "../community/community.model";
import { capitalizeWords } from "../utils/formatting";

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
    },
    foodPreferences: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    address: communityAddressSchema,
    coordinate: communityCoordinateSchema,
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

communityApplicationSchema.pre("save", function (next) {
  this.name = capitalizeWords(this.name);

  next();
});

const communityApplicationModel = model<CommunityApplication>(
  "CommunityApplication",
  communityApplicationSchema
);

export default communityApplicationModel;
