import {
  ActionIcon,
  Avatar,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  headerWrapper: {
    borderLeftWidth: "0!important",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

function ChatHeader() {
  const { classes } = useStyles();

  return (
    <Paper withBorder className={classes.headerWrapper} p={"lg"}>
      <Group>
        <Group>
          <ActionIcon>
            <IconLayoutSidebarLeftCollapse />
          </ActionIcon>
          <Divider orientation="vertical" />
          <Avatar radius="xl" />
          <Stack spacing={0}>
            <Title order={4} size={"h6"} weight={"600"}>
              Harriette Spoonlicker
            </Title>
            <Text color="dimmed" size={"xs"}>
              Online
            </Text>
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
}

export default ChatHeader;
