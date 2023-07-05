import { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import {
  donationState,
  getAllDonations,
} from "../../features/donation/donationSlice";
import DonationCard from "./DonationCard";
import { DonationStatus } from "../../features/donation/types";
import LoaderState from "../common/LoaderState";

type DonationListPanelProps = {
  status: DonationStatus;
};

// TODO: fix loader
// TODO: add empty state
function DonationListPanel({ status }: DonationListPanelProps) {
  const dispatch = useAppDispatch();

  const { loggedInUser } = useAppSelector(userState);
  const { donationList, isLoading } = useAppSelector(donationState);
  console.log(donationList);

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

  return (
    <SimpleGrid cols={3}>
      {donationList.map((donation) => (
        <DonationCard key={donation._id} {...donation} />
      ))}
    </SimpleGrid>
  );
}

export default DonationListPanel;
