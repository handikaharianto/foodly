import {
  ActionIcon,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useAppDispatch } from "../../app/hooks";
import { updateOneNotification } from "../../features/notification/notificationSlice";
import { NotificationSegment } from "./NotificationButton";
import { Notification } from "../../features/notification/types";
import { getTimeFromNow } from "../../utils/DateAndTime";

const useStyles = createStyles((theme) => ({
  notificationCard: {
    padding: theme.spacing.xl,
    ":hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },
  readOneIcon: {
    ":hover": {
      backgroundColor: "transparent",
    },
  },
}));

type NotificationCardProps = {
  notification: Notification;
  currentSegment: NotificationSegment;
};

function NotificationCard({
  notification,
  currentSegment,
}: NotificationCardProps) {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const updateOneNotificationStatus = (notificationId: string) => {
    dispatch(
      updateOneNotification({
        notificationId,
        isRead: currentSegment === NotificationSegment.UNREAD ? true : false,
      })
    );
  };

  return (
    <Card className={classes.notificationCard}>
      <Card.Section p="xs">
        <Group position="apart" spacing="xl">
          <Stack spacing="0.3rem">
            <Text size={rem(13)} maw="220px">
              {notification.content}
            </Text>
            <Text size="xs" color="dimmed">
              {getTimeFromNow(notification.createdAt.toString())}
            </Text>
          </Stack>
          <Tooltip
            withinPortal
            label={
              <Text size="0.7rem">
                {currentSegment === NotificationSegment.UNREAD
                  ? "Mark as read"
                  : "Mark as unread"}
              </Text>
            }
            position="bottom"
          >
            <ActionIcon
              component="div"
              radius="xl"
              variant="outline"
              color="dark"
              size={13}
              p={"0.1rem"}
              className={classes.readOneIcon}
              onClick={() => updateOneNotificationStatus(notification._id)}
            >
              {currentSegment === NotificationSegment.READ && <IconCheck />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default NotificationCard;
