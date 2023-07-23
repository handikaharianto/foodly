import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  Stack,
  DefaultMantineColor,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

import { Donation, DonationStatus } from "../../features/donation/types";
import { getTimeFromNow } from "../../utils/DateAndTime";

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s",
    "&:hover": {
      boxShadow: theme.shadows.sm,
      scale: "1.01",
    },
  },
}));

type DonationCardProps = Donation;

function DonationCard({ _id, status, createdAt, donor }: DonationCardProps) {
  const { classes, theme } = useStyles();

  const progressValue =
    status === DonationStatus.PENDING
      ? 0
      : status === DonationStatus.IN_PROGRESS
      ? 50
      : 100;

  const progressColor: DefaultMantineColor =
    status === DonationStatus.PENDING
      ? "grey"
      : status === DonationStatus.IN_PROGRESS
      ? "blue"
      : status === DonationStatus.RECEIVED
      ? "green"
      : "red";

  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      to={`/donation-requests/${_id}`}
      component={Link}
      className={classes.card}
    >
      <Group position="apart" align="stretch">
        <Stack spacing={0}>
          <Text fz="xs" color="dimmed">
            Donated by
          </Text>
          <Text fz="md" transform="capitalize" weight={600}>
            {donor.firstName} {donor.lastName}
          </Text>
          <Text fz="xs" color="dimmed" mt="auto">
            {getTimeFromNow(createdAt as unknown as string)}
          </Text>
        </Stack>

        <div>
          <RingProgress
            roundCaps
            thickness={8}
            size={100}
            sections={[{ value: progressValue, color: progressColor }]}
            label={
              status === DonationStatus.REJECTED ? (
                <Center>
                  <IconX size={40} color={theme.colors.red[7]} stroke={3} />
                </Center>
              ) : (
                <Text
                  color={progressColor}
                  weight={700}
                  align="center"
                  size="xl"
                >
                  {progressValue}%
                </Text>
              )
            }
          />
        </div>
      </Group>
    </Card>
  );
}

export default DonationCard;
