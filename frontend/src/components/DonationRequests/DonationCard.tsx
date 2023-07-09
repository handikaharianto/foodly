import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  Stack,
  DefaultMantineColor,
} from "@mantine/core";
import { Donation, DonationStatus } from "../../features/donation/types";
import { getTimeFromNow } from "../../utils/DateAndTime";
import { Link } from "react-router-dom";

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
  const { classes } = useStyles();

  const progressValue =
    status === DonationStatus.PENDING
      ? 0
      : status === DonationStatus.IN_PROGRESS
      ? 50
      : 100;

  const progressColor: DefaultMantineColor =
    status === DonationStatus.PENDING || status === DonationStatus.IN_PROGRESS
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
              <Text color={progressColor} weight={700} align="center" size="xl">
                {progressValue}%
              </Text>
            }
          />
        </div>
      </Group>
    </Card>
  );
}

export default DonationCard;
