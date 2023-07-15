import { useEffect, useState } from "react";
import { Paper, SimpleGrid, Stack, createStyles } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatHeader from "../components/Chat/ChatHeader";
import EmptyState from "../components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addNewMessage,
  chatState,
  clearCurrentChat,
  getAllChats,
  getAllMessages,
  reorderUserContacts,
  updateChatLatestMessage,
  updateManyMessages,
} from "../features/chat/ChatSlice";
import { Message } from "../features/chat/types";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import LoaderState from "../components/common/LoaderState";
import { SEND_CHAT_MESSAGE, socket } from "../socket/socket";
import { userState } from "../features/user/UserSlice";

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
  const [isLoading, setIsLoading] = useState(true);

  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const { chat } = useAppSelector(chatState);
  const { loggedInUser } = useAppSelector(userState);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([dispatch(getAllChats({}))]).then((res) => {
      if (chat) {
        dispatch(getAllMessages({ chatId: chat._id }));
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const onSendChatMessage = (data: Message) => {
      dispatch(addNewMessage(data));
      dispatch(
        updateChatLatestMessage({
          ...data,
          isRead: chat?._id === data.chat._id,
        })
      );
      dispatch(reorderUserContacts(data));
      dispatch(
        updateManyMessages({
          chatId: chat?._id as string,
          isRead: true,
          receiver: loggedInUser?._id as string,
        })
      );
    };

    socket.on(SEND_CHAT_MESSAGE, onSendChatMessage);

    return () => {
      socket.off(SEND_CHAT_MESSAGE, onSendChatMessage);
    };
  }, [chat?._id]);

  useEffect(() => {
    const fromDonationsPage =
      location.state?.previousPath.includes("/donations");
    const fromDonationRequestsPage =
      location.state?.previousPath.includes("/donation-requests");
    console.log(fromDonationsPage);
    console.log(fromDonationRequestsPage);

    if (fromDonationsPage || fromDonationRequestsPage) {
      return;
    }
    dispatch(clearCurrentChat({}));
  }, [dispatch]);

  return (
    <SimpleGrid spacing={0} className={classes.chatGrid} h={"100%"}>
      <ChatSidebar isLoading={isLoading} />
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
            <ChatMessages isLoading={isLoading} />
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
