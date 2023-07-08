import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Popover,
  ScrollArea,
  SegmentedControl,
  Text,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBell, IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";

enum NotificationSegment {
  UNREAD = "unread",
  READ = "read",
}

const useStyles = createStyles((theme) => ({
  notificationButton: {
    boxShadow: theme.shadows.xl,
  },
  readAllButton: {
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

const data = [
  {
    _id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, aliquam!",
    isRead: false,
  },
  {
    _id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, aliquam!",
    isRead: false,
  },
  {
    _id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, aliquam!",
    isRead: false,
  },
  {
    _id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, aliquam!",
    isRead: false,
  },
];

function Notification() {
  const [currentSegment, setCurrentSegment] = useState<NotificationSegment>(
    NotificationSegment.UNREAD
  );

  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  console.log(hovered);
  console.log(ref);

  return (
    <Popover width={350} position="bottom-end" shadow="xl" radius="md">
      <Popover.Target>
        <ActionIcon
          radius="xl"
          size={28}
          className={classes.notificationButton}
        >
          <IconBell size="1.125rem" />
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
        <Group position="right" mb="md">
          <Button
            type="button"
            leftIcon={<IconCircleCheck size={16} stroke={1.5} />}
            size="xs"
            variant="white"
            color="gray.7"
            classNames={{
              root: classes.readAllButton,
              leftIcon: classes.readAllIcon,
            }}
          >
            Mark all as read
          </Button>
        </Group>
        <ScrollArea.Autosize offsetScrollbars mah={260}>
          {data.map((notification) => (
            <Card className={classes.notificationCard}>
              <Card.Section p="xs">
                <Group position="apart" spacing="xl">
                  <Text size={rem(13)} maw="220px">
                    {notification.content}
                  </Text>
                  <Tooltip
                    withinPortal
                    label={<Text size="0.7rem">Mark as read</Text>}
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
                    >
                      {/* <IconCheck /> */}
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Card.Section>
            </Card>
          ))}
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}

export default Notification;
