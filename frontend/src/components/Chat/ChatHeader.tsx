import {
  Avatar,
  Group,
  Paper,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";

import { useAppSelector } from "../../app/hooks";
import { chatState } from "../../features/chat/ChatSlice";
import { getSender } from "../../utils/chat";
import { userState } from "../../features/user/UserSlice";

const useStyles = createStyles((theme) => ({
  headerWrapper: {
    borderLeftWidth: "0!important",
    borderTopLeftRadius: 0,
    borderTopRightRadius: theme.radius.md,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

function ChatHeader() {
  const { classes } = useStyles();

  const { loggedInUser } = useAppSelector(userState);
  const { chat } = useAppSelector(chatState);

  return (
    <Paper withBorder className={classes.headerWrapper} p={"lg"}>
      <Group>
        <Group>
          {/* <ActionIcon>
            <IconLayoutSidebarLeftCollapse />
          </ActionIcon>
          <Divider orientation="vertical" /> */}
          <Avatar radius="xl" />
          <Stack spacing={0}>
            <Title order={4} size={"h6"} weight={"600"} transform="capitalize">
              {getSender(loggedInUser!, chat!.users)}
            </Title>
            {/* <Text color="dimmed" size={"xs"}>
              Online
            </Text> */}
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
}

export default ChatHeader;
