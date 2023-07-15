import { useEffect } from "react";
import { Paper, SimpleGrid, Stack, createStyles } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatHeader from "../components/Chat/ChatHeader";
import EmptyState from "../components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addNewMessage,
  chatState,
  updateChatLatestMessage,
} from "../features/chat/ChatSlice";
import { Message } from "../features/chat/types";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import LoaderState from "../components/common/LoaderState";
import { SEND_CHAT_MESSAGE, socket } from "../socket/socket";

const useStyles = createStyles((theme) => ({
  chatGrid: {
    gridTemplateColumns: "0.3fr 0.7fr",
  },
  messageEmptyState: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: "0 !important",
  },
  messageLoadingState: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: "0 !important",
  },
}));

function Chat() {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const { chat, isLoading } = useAppSelector(chatState);

  useEffect(() => {
    const onSendChatMessage = (data: Message) => {
      dispatch(addNewMessage(data));
      dispatch(updateChatLatestMessage(data));
    };

    socket.on(SEND_CHAT_MESSAGE, onSendChatMessage);

    return () => {
      socket.off(SEND_CHAT_MESSAGE, onSendChatMessage);
    };
  }, []);

  return (
    <SimpleGrid spacing={0} className={classes.chatGrid} h={"100%"}>
      <ChatSidebar />
      <Stack spacing={0}>
        {isLoading ? (
          <Paper
            withBorder
            h={"100%"}
            className={classes.messageLoadingState}
            radius="md"
          >
            <LoaderState />
          </Paper>
        ) : chat ? (
          <>
            <ChatHeader />
            <ChatMessages />
          </>
        ) : (
          <Paper
            withBorder
            h={"100%"}
            className={classes.messageEmptyState}
            radius="md"
          >
            <EmptyState
              Icon={IconMessage}
              title="No messages, yet."
              description="Start new conversation with communities out there after they accept your donation request."
            />
          </Paper>
        )}
      </Stack>
    </SimpleGrid>
  );
}

export default Chat;
