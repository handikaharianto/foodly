import { CommunityApplication } from "../features/communityApplication/types";

export const formatCommunityAddress = ({
  address,
}: CommunityApplication): string => {
  const communityAddress = `${address.addressLine1}, ${address.city}, ${address.postalCode}`;

  return address.addressLine2
    ? `${address.addressLine2}, ${communityAddress}`
    : communityAddress;
};
