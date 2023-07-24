import * as turf from "@turf/turf";
import { point } from "@turf/helpers";

import { CommunityAddress } from "../features/community/types";

export const formatCommunityAddress = (address: CommunityAddress): string => {
  const communityAddress = `${address.addressLine1}, ${address.city}, ${address.postalCode}`;

  return address.addressLine2
    ? `${address.addressLine2}, ${communityAddress}`
    : communityAddress;
};

export type CoordinateType = [number, number];
type TurfOptionsType = { units: "kilometers" | "miles" };

export const calculateDistance = (
  from: CoordinateType,
  to: CoordinateType,
  options: TurfOptionsType
) => {
  if (from === null || !to[0] || !to[1]) {
    return;
  }

  const fromCoordinate = point(from);
  const toCoordinate = point(to);

  return turf.distance(fromCoordinate, toCoordinate, options).toFixed(1);
};
