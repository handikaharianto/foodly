import { Input, Paper, ScrollArea, Title, createStyles } from "@mantine/core";
import { IconMessage, IconSearch } from "@tabler/icons-react";
import UserContact from "./UserContact";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { chatState, getAllChats } from "../../features/chat/ChatSlice";
import LoaderState from "../common/LoaderState";
import EmptyState from "../common/EmptyState";

const useStyles = createStyles((theme) => ({
  chatSidebar: {
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  scrollAreaRoot: {
    position: "relative",
  },
  scrollAreaViewport: {
    position: "absolute",
    inset: "0",
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    overflowX: "hidden !important" as "hidden",

    "& > div:first-of-type": {
      display: "block !important",
      height: "100%",
    },
  },
}));

function ChatSidebar() {
  const { classes } = useStyles();

  const { isLoading, chats } = useAppSelector(chatState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  return (
    <Paper withBorder h={"100%"} className={classes.chatSidebar}>
      <Title order={4} size={"h5"} weight={"600"} p={"lg"}>
        Messages
      </Title>
      <Input
        icon={<IconSearch size={"0.8rem"} />}
        placeholder="Search"
        mx={"lg"}
      />
      <ScrollArea
        offsetScrollbars
        h={"100%"}
        my={"lg"}
        classNames={{
          root: classes.scrollAreaRoot,
          viewport: classes.scrollAreaViewport,
        }}
      >
        {isLoading ? (
          <LoaderState />
        ) : chats.length > 0 ? (
          chats.map((chat) => <UserContact key={chat._id} {...chat} />)
        ) : (
          <EmptyState Icon={IconMessage} title="Chat is empty." />
        )}
      </ScrollArea>
    </Paper>
  );
}

export default ChatSidebar;
