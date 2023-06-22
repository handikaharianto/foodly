import { model, Schema } from "mongoose";
import { Community, CommunityAddress, CommunityCoordinate } from "./types";

const communitySchema = new Schema<Community>(
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

export const communityAddressSchema = new Schema<CommunityAddress>({
  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
});

export const communityCoordinateSchema = new Schema<CommunityCoordinate>({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const communityModel = model<Community>("Community", communitySchema);

export default communityModel;
