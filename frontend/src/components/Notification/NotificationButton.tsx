import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Popover,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { IconBell, IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NOTIFICATION, socket } from "../../socket/socket";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  NotificationState,
  addNotification,
  getAllNotifications,
  updateManyNotifications,
} from "../../features/notification/notificationSlice";
import { Notification as Notification } from "../../features/notification/types";
import NotificationCard from "./NotificationCard";

export enum NotificationSegment {
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
}));

function NotificationButton() {
  const [currentSegment, setCurrentSegment] = useState<NotificationSegment>(
    NotificationSegment.UNREAD
  );

  const dispatch = useAppDispatch();
  const { notificationList, isLoading } = useAppSelector(NotificationState);

  const { classes, theme } = useStyles();

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
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  currentSegment={currentSegment}
                />
              ))}
            </ScrollArea.Autosize>
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

export default NotificationButton;
