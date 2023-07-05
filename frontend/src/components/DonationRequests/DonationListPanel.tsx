import { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { IconHeartHandshake } from "@tabler/icons-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import {
  donationState,
  getAllDonations,
} from "../../features/donation/donationSlice";
import DonationCard from "./DonationCard";
import { DonationStatus } from "../../features/donation/types";
import LoaderState from "../common/LoaderState";
import EmptyState from "../common/EmptyState";

type DonationListPanelProps = {
  status: DonationStatus;
};

// TODO: fix loader
// TODO: add empty state
function DonationListPanel({ status }: DonationListPanelProps) {
  const dispatch = useAppDispatch();

  const { loggedInUser } = useAppSelector(userState);
  const { donationList, isLoading } = useAppSelector(donationState);

  useEffect(() => {
    dispatch(
      getAllDonations({
        status,
        community: loggedInUser?.community,
        limit: 10,
        page: 1,
      })
    );
  }, [status]);

  if (isLoading) {
    return <LoaderState />;
  }

  if (!isLoading && donationList.length < 1) {
    return (
      <EmptyState
        Icon={IconHeartHandshake}
        title={"No donation requests found."}
      />
    );
  }

  return (
    <SimpleGrid cols={3}>
      {donationList.map((donation) => (
        <DonationCard key={donation._id} {...donation} />
      ))}
    </SimpleGrid>
  );
}

export default DonationListPanel;
