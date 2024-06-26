import { useEffect, useState } from "react";
import { Pagination, SimpleGrid, Stack } from "@mantine/core";
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

function DonationListPanel({ status }: DonationListPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector(userState);
  const { donationList, isLoading, totalPages } = useAppSelector(donationState);

  useEffect(() => {
    dispatch(
      getAllDonations({
        status,
        community: loggedInUser?.community,
        limit: 9,
        page: currentPage,
      })
    );
  }, [currentPage, loggedInUser, status]);

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
    <Stack justify="space-between" h="100%">
      <SimpleGrid cols={3}>
        {donationList.map((donation) => (
          <DonationCard key={donation._id} {...donation} />
        ))}
      </SimpleGrid>
      {donationList.length > 0 && (
        <Pagination
          total={totalPages || 1}
          value={currentPage}
          onChange={setCurrentPage}
          color="red"
          position="right"
          mt="xl"
        />
      )}
    </Stack>
  );
}

export default DonationListPanel;
