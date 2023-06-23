import { Schema, model } from "mongoose";
import { Donation, DonationItem, DonationStatus } from "./types";

const donationItemSchema = new Schema<DonationItem>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const donationSchema = new Schema<Donation>(
  {
    items: [donationItemSchema],
    status: {
      type: String,
      enum: Object.values(DonationStatus),
      default: DonationStatus.PENDING,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const donationModel = model<Donation>("Donation", donationSchema);

export default donationModel;
