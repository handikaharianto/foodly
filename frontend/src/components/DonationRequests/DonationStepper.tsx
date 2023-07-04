import { Stepper, Text } from "@mantine/core";

import { donationState } from "../../features/donation/donationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DonationStatus } from "../../features/donation/types";
import { IconCheck, IconX } from "@tabler/icons-react";

function DonationStepper() {
  const dispatch = useAppDispatch();
  const { donation, isLoading } = useAppSelector(donationState);

  const activeStepper =
    donation?.status === DonationStatus.PENDING
      ? 1
      : donation?.status === DonationStatus.IN_PROGRESS
      ? 2
      : donation?.status === DonationStatus.RECEIVED ||
        donation?.status === DonationStatus.REJECTED
      ? 3
      : 4;

  return (
    <Stepper
      allowNextStepsSelect={false}
      active={activeStepper}
      breakpoint="sm"
      px="8rem"
      mt="2.5rem"
      mb="5rem"
    >
      <Stepper.Step
        loading={donation?.status === DonationStatus.PENDING}
        label="Step 1"
        description="Waiting for response"
      ></Stepper.Step>
      <Stepper.Step
        loading={donation?.status === DonationStatus.IN_PROGRESS}
        label="Step 2"
        description="In Progress"
      ></Stepper.Step>
      <Stepper.Step
        completedIcon={
          donation?.status === DonationStatus.RECEIVED ? (
            <IconCheck />
          ) : (
            <IconX />
          )
        }
        color={
          donation?.status === DonationStatus.RECEIVED
            ? "green"
            : donation?.status === DonationStatus.REJECTED
            ? "red"
            : undefined
        }
        label="Final step"
        description={
          donation?.status === DonationStatus.RECEIVED ||
          donation?.status === DonationStatus.REJECTED ? (
            <Text transform="capitalize">
              {donation?.status === DonationStatus.RECEIVED
                ? DonationStatus.RECEIVED
                : DonationStatus.REJECTED}
            </Text>
          ) : undefined
        }
      ></Stepper.Step>
    </Stepper>
  );
}

export default DonationStepper;
