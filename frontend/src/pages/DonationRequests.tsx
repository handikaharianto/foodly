import { useEffect } from "react";

import MainContent from "../components/common/MainContent";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  donationState,
  getAllDonations,
} from "../features/donation/donationSlice";
import { userState } from "../features/user/UserSlice";
import LoaderState from "../components/common/LoaderState";
import { DonationCard } from "../components/DonationRequests/DonationCard";
import { SimpleGrid } from "@mantine/core";

function DonationRequests() {
  const dispatch = useAppDispatch();

  const { loggedInUser } = useAppSelector(userState);
  const { donationList, isLoading } = useAppSelector(donationState);
  console.log(donationList);

  useEffect(() => {
    dispatch(
      getAllDonations({
        community: loggedInUser?.community,
        limit: 10,
        page: 1,
      })
    );
  }, []);

  return (
    <MainContent heading="Donation Requests">
      {isLoading ? (
        <LoaderState />
      ) : (
        <SimpleGrid cols={3}>
          {donationList.map((donation) => (
            <DonationCard key={donation._id} {...donation} />
          ))}
        </SimpleGrid>
      )}
    </MainContent>
  );
}

export default DonationRequests;
