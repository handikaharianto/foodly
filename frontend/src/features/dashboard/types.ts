import { DonationStatus } from "../donation/types";

export type DonationByMonth = {
  month: string;
  count: number;
};

export type DonationStatusStats = {
  status: DonationStatus;
  count: number;
};
