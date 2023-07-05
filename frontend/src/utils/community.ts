import { CommunityAddress } from "../features/community/types";

export const formatCommunityAddress = (address: CommunityAddress): string => {
  const communityAddress = `${address.addressLine1}, ${address.city}, ${address.postalCode}`;

  return address.addressLine2
    ? `${address.addressLine2}, ${communityAddress}`
    : communityAddress;
};
