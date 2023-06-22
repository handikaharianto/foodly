import { model, Schema } from "mongoose";
import { Community, CommunityAddress, CommunityCoordinate } from "./types";

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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const communityModel = model<Community>("Community", communitySchema);

export default communityModel;
