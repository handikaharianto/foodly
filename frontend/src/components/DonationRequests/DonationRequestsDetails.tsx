import { useEffect } from "react";
import { Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import MainContent from "../common/MainContent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  donationState,
  getOneDonation,
  updateOneDonation,
} from "../../features/donation/donationSlice";
import LoaderState from "../common/LoaderState";
import { DonationStatus } from "../../features/donation/types";
import DonationStepper from "./DonationStepper";
import DonationListTable from "./DonationListTable";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";
import { createChat } from "../../features/chat/ChatSlice";
import { userState } from "../../features/user/UserSlice";
import { NOTIFICATION, socket } from "../../socket/socket";
import { UserRole } from "../../features/user/types";

function DonationRequestsDetails() {
  const { donationId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { donation, isLoading } = useAppSelector(donationState);
  const { loggedInUser } = useAppSelector(userState);

  useEffect(() => {
    dispatch(getOneDonation({ donationId: donationId as string }));
  }, []);

  const acceptDonation = async () => {
    try {
      socket.emit(NOTIFICATION, {
        content: `${donation?.community.name} has accepted your donation request.`,
        sender: loggedInUser?._id,
        receiver: donation?.donor._id,
        target:
          loggedInUser?.role === UserRole.COMMUNITY
            ? UserRole.COMMUNITY
            : UserRole.PUBLIC,
      });

      const res = await dispatch(
        updateOneDonation({
          donationId: donationId as string,
          status: DonationStatus.IN_PROGRESS,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message: "Donation has been accepted!",
          variant: NotificationVariant.SUCCESS,
        });
      } else if (res.meta.requestStatus === "rejected") {
        showNotification({
          message: "Failed to accept donation. Please try again later.",
          variant: NotificationVariant.ERROR,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectDonation = async () => {
    socket.emit(NOTIFICATION, {
      content: `${donation?.community.name} has rejected your donation request.`,
      sender: loggedInUser?._id,
      receiver: donation?.donor._id,
      target:
        loggedInUser?.role === UserRole.COMMUNITY
          ? UserRole.COMMUNITY
          : UserRole.PUBLIC,
    });

    try {
      const res = await dispatch(
        updateOneDonation({
          donationId: donationId as string,
          status: DonationStatus.REJECTED,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message: "Donation has been rejected!",
          variant: NotificationVariant.SUCCESS,
        });
      } else if (res.meta.requestStatus === "rejected") {
        showNotification({
          message: "Failed to update donation status. Please try again later.",
          variant: NotificationVariant.ERROR,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const donationReceived = async () => {
    try {
      socket.emit(NOTIFICATION, {
        content: `${donation?.community.name} has received your donation. Thank you for donating!`,
        sender: loggedInUser?._id,
        receiver: donation?.donor._id,
        target:
          loggedInUser?.role === UserRole.COMMUNITY
            ? UserRole.COMMUNITY
            : UserRole.PUBLIC,
      });

      const res = await dispatch(
        updateOneDonation({
          donationId: donationId as string,
          status: DonationStatus.RECEIVED,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message: "Donation has been updated to received!",
          variant: NotificationVariant.SUCCESS,
        });
      } else if (res.meta.requestStatus === "rejected") {
        showNotification({
          message: "Failed to update donation status. Please try again later.",
          variant: NotificationVariant.ERROR,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contactDonor = () => {
    dispatch(
      createChat({
        users: [loggedInUser?._id, donation?.donor._id] as string[],
      })
    );
    navigate("/chat");
  };

  return (
    <MainContent heading="Donation Request Details">
      {isLoading ? (
        <LoaderState />
      ) : (
        <>
          <DonationStepper />
          <Group position="apart">
            <Stack spacing={0}>
              <Title
                transform="capitalize"
                order={3}
                align="left"
                size="h4"
                weight={600}
              >
                {donation?.donor.firstName} {donation?.donor.lastName}
              </Title>
              <Text color="dimmed" size="sm">
                {donation?.donor.email}
              </Text>
            </Stack>
            {donation?.status === DonationStatus.PENDING && (
              <Group position="right">
                <Button variant="filled" color="red" onClick={acceptDonation}>
                  Accept
                </Button>
                <Button variant="subtle" color="red" onClick={rejectDonation}>
                  Reject
                </Button>
              </Group>
            )}
            {donation?.status === DonationStatus.IN_PROGRESS && (
              <Group position="right">
                {/* // TODO: add icon */}
                <Button variant="filled" color="red" onClick={donationReceived}>
                  Donation received
                </Button>
                <Button variant="default" color="red" onClick={contactDonor}>
                  Contact donor
                </Button>
              </Group>
            )}
          </Group>
          <Divider my="xl" color="gray.3" />
          <DonationListTable />
        </>
      )}
    </MainContent>
  );
}

export default DonationRequestsDetails;
