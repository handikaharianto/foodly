import { useEffect } from "react";
import {
  Badge,
  Button,
  Divider,
  Group,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";

import MainContent from "../common/MainContent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteOneDonation,
  donationState,
  getOneDonation,
} from "../../features/donation/donationSlice";
import LoaderState from "../common/LoaderState";
import { DonationStatus } from "../../features/donation/types";
import DonationStepper from "./DonationStepper";
import DonationListTable from "./DonationListTable";
import { createChat, getAllMessages } from "../../features/chat/ChatSlice";
import { userState } from "../../features/user/UserSlice";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";

function DonationDetails() {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { donation, isLoading } = useAppSelector(donationState);
  const { loggedInUser } = useAppSelector(userState);

  useEffect(() => {
    dispatch(getOneDonation({ donationId: donationId as string }));
  }, []);

  const contactOwner = () => {
    dispatch(
      createChat({
        users: [loggedInUser?._id, donation?.community.user] as string[],
      })
    );
    navigate("/chat", { state: { previousPath: location.pathname } });
  };

  const cancelDonation = async () => {
    try {
      const res = await dispatch(
        deleteOneDonation({ donationId: donationId as string })
      );
      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message: "Donation has successfully been cancelled!",
          variant: NotificationVariant.SUCCESS,
        });
      }
      navigate("/donations", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const openCancelModal = () =>
    modals.openConfirmModal({
      title: "Cancel your donation",
      centered: true,
      children: (
        <Text size="sm" mb="2.5rem">
          Are you sure you want to cancel your donation?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Keep it" },
      confirmProps: { color: "red" },
      onConfirm: cancelDonation,
    });

  return (
    <MainContent heading="Donation Details">
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
                {donation?.community.name}
              </Title>
              <Badge
                color="red"
                size="md"
                mt="xs"
                radius="sm"
                variant="outline"
              >
                {donation?.community.type}
              </Badge>
            </Stack>
            {donation?.status === DonationStatus.IN_PROGRESS && (
              <Button variant="filled" color="red" onClick={contactOwner}>
                Contact owner
              </Button>
            )}
            {donation?.status === DonationStatus.PENDING && (
              <Button variant="filled" color="red" onClick={openCancelModal}>
                Cancel donation
              </Button>
            )}
          </Group>
          <Divider my="xl" color="gray.3" />
          <DonationListTable />
        </>
      )}
    </MainContent>
  );
}

export default DonationDetails;
