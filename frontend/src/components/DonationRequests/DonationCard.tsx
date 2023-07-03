import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  Stack,
} from "@mantine/core";
import { Donation } from "../../features/donation/types";
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

export function DonationCard({
  _id,
  status,
  createdAt,
  donor,
}: DonationCardProps) {
  const { classes } = useStyles();

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
          <Text fz="sm" color="dimmed">
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
            thickness={6}
            size={100}
            sections={[{ value: 0, color: "blue" }]}
            label={
              <div>
                <Text ta="center" fz="sm" transform="capitalize">
                  {status}
                </Text>
              </div>
            }
          />
        </div>
      </Group>
    </Card>
  );
}
