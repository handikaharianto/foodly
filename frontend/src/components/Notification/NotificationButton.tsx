import {
  ActionIcon,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Popover,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { IconBell, IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NOTIFICATION, socket } from "../../socket/socket";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  NotificationState,
  addNotification,
  getAllNotifications,
  updateManyNotifications,
  updateOneNotification,
} from "../../features/notification/notificationSlice";
import { Notification as Notification } from "../../features/notification/types";
import { userState } from "../../features/user/UserSlice";

enum NotificationSegment {
  UNREAD = "unread",
  READ = "read",
}

const useStyles = createStyles((theme) => ({
  notificationButton: {
    position: "relative",
    boxShadow: theme.shadows.xl,
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  notificationCount: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
  },
  readAllButton: {
    ":disabled": {
      backgroundColor: "transparent",
    },
    ":hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },
  readAllIcon: {
    marginRight: "0.3rem",
  },
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

function NotificationButton() {
  const [currentSegment, setCurrentSegment] = useState<NotificationSegment>(
    NotificationSegment.UNREAD
  );

  const dispatch = useAppDispatch();
  const { notificationList, isLoading } = useAppSelector(NotificationState);
  const { loggedInUser } = useAppSelector(userState);

  const { classes, theme } = useStyles();

  const updateOneNotificationStatus = (notificationId: string) => {
    dispatch(
      updateOneNotification({
        notificationId,
        isRead: currentSegment === NotificationSegment.UNREAD ? true : false,
      })
    );
  };

  const markAllNotificationsAsRead = () => {
    dispatch(updateManyNotifications({ isRead: true }));
  };

  useEffect(() => {
    dispatch(
      getAllNotifications({
        isRead: currentSegment === NotificationSegment.UNREAD ? false : true,
      })
    );
  }, [currentSegment]);

  useEffect(() => {
    const receiveNotification = (data: Notification) => {
      if (currentSegment === NotificationSegment.UNREAD) {
        dispatch(addNotification(data));
      }
    };

    socket.on(NOTIFICATION, receiveNotification);

    return () => {
      socket.off(NOTIFICATION, receiveNotification);
    };
  }, [currentSegment]);

  return (
    <Popover
      width={350}
      position="bottom-end"
      shadow="xl"
      radius="md"
      transitionProps={{ duration: 0 }}
    >
      <Popover.Target>
        <ActionIcon
          radius="xl"
          size={28}
          className={classes.notificationButton}
        >
          <IconBell size="1.125rem" />
          {!isLoading &&
            currentSegment === NotificationSegment.UNREAD &&
            notificationList.length > 0 && (
              <ActionIcon
                component="div"
                color="dark"
                radius="xl"
                variant="filled"
                size={15}
                className={classes.notificationCount}
              >
                <Text size={10}>{notificationList.length}</Text>
              </ActionIcon>
            )}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown px="xl" py="md">
        <Group position="apart">
          <Text size="xs">Notifications</Text>
          <SegmentedControl
            size="xs"
            data={[
              { label: "Unread", value: NotificationSegment.UNREAD },
              { label: "Read", value: NotificationSegment.READ },
            ]}
            value={currentSegment}
            onChange={(value: NotificationSegment) => setCurrentSegment(value)}
          />
        </Group>
        <Divider color="gray.2" my="md" />

        {!isLoading && currentSegment === NotificationSegment.UNREAD && (
          <Group position="right">
            <Button
              type="button"
              disabled={notificationList.length === 0}
              leftIcon={<IconCircleCheck size={16} stroke={1.5} />}
              size="xs"
              variant="white"
              color="gray.7"
              classNames={{
                root: classes.readAllButton,
                leftIcon: classes.readAllIcon,
              }}
              onClick={markAllNotificationsAsRead}
            >
              Mark all as read
            </Button>
          </Group>
        )}
        {isLoading ? (
          <Group position="center">
            <Loader size="xs" color="red" />
          </Group>
        ) : notificationList.length === 0 ? (
          <Center h={150}>
            <Stack spacing="xs">
              <Center>
                <IconBell stroke={1.5} color={theme.colors.gray[5]} />
              </Center>
              <Text align="center" color="dimmed" size="sm">
                No{" "}
                {currentSegment === NotificationSegment.READ
                  ? "read"
                  : "unread"}{" "}
                notifications
              </Text>
            </Stack>
          </Center>
        ) : (
          <>
            <ScrollArea.Autosize offsetScrollbars mah={260} mt="md">
              {notificationList.map((notification) => (
                <Card
                  key={notification._id}
                  className={classes.notificationCard}
                >
                  <Card.Section p="xs">
                    <Group position="apart" spacing="xl">
                      <Text size={rem(13)} maw="220px">
                        {notification.content}
                      </Text>
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
                          onClick={() =>
                            updateOneNotificationStatus(notification._id)
                          }
                        >
                          {currentSegment === NotificationSegment.READ && (
                            <IconCheck />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Card.Section>
                </Card>
              ))}
            </ScrollArea.Autosize>
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

export default NotificationButton;
