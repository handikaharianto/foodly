import { model, Schema } from "mongoose";

import { RefreshToken, User, UserRole } from "./types";
import { REFRESH_TOKEN_EXPIRATION_TIME } from "../common/auth";

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
      default: UserRole.PUBLIC,
    },
  },
  { timestamps: true }
);

const refreshTokenSchema = new Schema<RefreshToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
      default: new Date(+new Date() + REFRESH_TOKEN_EXPIRATION_TIME),
    },
  },
  { timestamps: true }
);

export const refreshTokenModel = model<RefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export const userModel = model<User>("User", userSchema);
