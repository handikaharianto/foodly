import {
  Paper,
  ScrollArea,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { IconMessage, IconSearch } from "@tabler/icons-react";
import UserContact from "./UserContact";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  addNewChatWithMessage,
  chatState,
  getAllChats,
} from "../../features/chat/ChatSlice";
import LoaderState from "../common/LoaderState";
import EmptyState from "../common/EmptyState";
import { useDebouncedValue } from "@mantine/hooks";
import { getSender } from "../../utils/chat";
import { userState } from "../../features/user/UserSlice";
import { LoginUserResponse } from "../../features/user/types";
import { useLocation } from "react-router-dom";
import { CREATE_CHAT_WITH_MESSAGE, socket } from "../../socket/socket";
import { Chat } from "../../features/chat/types";

const useStyles = createStyles((theme) => ({
  chatSidebar: {
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: theme.radius.md,
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
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 200);

  const location = useLocation();

  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const { isLoading, chats } = useAppSelector(chatState);
  const { loggedInUser } = useAppSelector(userState);

  const memoizedChats = useMemo(() => {
    let filteredChats = chats.filter((chat) => {
      const contactName = getSender(
        loggedInUser as LoginUserResponse,
        chat.users
      );

      if (contactName.includes(debouncedSearchInput.toLowerCase())) {
        return true;
      }
      return false;
    });

    // check whether the chat starts from /donations
    if (!location.state?.previousPath?.includes("/donations")) {
      filteredChats = filteredChats.filter(
        (chat) => chat.latestMessage !== undefined
      );
    }

    return filteredChats;
  }, [chats, debouncedSearchInput, location.state, loggedInUser]);

  useEffect(() => {
    dispatch(getAllChats({}));
  }, []);

  useEffect(() => {
    const createNewChatWithMessage = (chat: Chat) => {
      dispatch(addNewChatWithMessage(chat));
    };

    socket.on(CREATE_CHAT_WITH_MESSAGE, createNewChatWithMessage);
    return () => {
      socket.off(CREATE_CHAT_WITH_MESSAGE, createNewChatWithMessage);
    };
  }, []);

  return (
    <Paper withBorder h={"100%"} className={classes.chatSidebar}>
      <Title order={4} size={"h5"} weight={"600"} p={"lg"}>
        Messages
      </Title>
      <TextInput
        icon={<IconSearch size={"0.8rem"} />}
        placeholder="Search"
        mx={"lg"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
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
        ) : memoizedChats.length > 0 ? (
          memoizedChats.map((chat) => <UserContact key={chat._id} {...chat} />)
        ) : (
          <EmptyState Icon={IconMessage} title="Chat is empty." />
        )}
      </ScrollArea>
    </Paper>
  );
}

export default ChatSidebar;
