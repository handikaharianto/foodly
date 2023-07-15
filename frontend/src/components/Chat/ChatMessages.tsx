import {
  ActionIcon,
  Container,
  Group,
  Paper,
  Textarea,
  createStyles,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { CREATE_CHAT_WITH_MESSAGE, socket } from "../../socket/socket";
import { useForm } from "@mantine/form";
import { useScrollIntoView } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import {
  chatState,
  createMessage,
  getAllMessages,
  updateChatLatestMessage,
} from "../../features/chat/ChatSlice";
import SingleMessage from "./SingleMessage";
import { getChatReceiverId } from "../../utils/chat";
import { LoginUserResponse, User } from "../../features/user/types";

const useStyles = createStyles((theme) => ({
  chatMessages: {
    position: "relative",
    flexGrow: 1,
    borderLeftWidth: "0!important",
    borderTopWidth: "0!important",
    borderBottomWidth: "0!important",
    borderRadius: 0,
  },
  messagesContainer: {
    position: "absolute",
    inset: "0",
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing.lg,
    overflowY: "auto",
  },
  chatInputContainer: {
    borderLeftWidth: "0!important",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  chatInputRoot: {},
  chatTextArea: {
    flexGrow: 1,
  },
}));

const SEND_CHAT_MESSAGE = "send_chat_message";

function ChatMessages() {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector(userState);
  const { chat, messages, isLoading } = useAppSelector(chatState);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ duration: 0 });

  const messageForm = useForm({
    initialValues: {
      content: "",
    },
  });

  const submitMessage = messageForm.onSubmit(async (data) => {
    if (data.content.trim() === "") return;

    const message = {
      ...data,
      sender: loggedInUser!._id,
      chat: chat!._id,
    };

    try {
      const messageData = await dispatch(createMessage(message)).unwrap();
      socket.emit(SEND_CHAT_MESSAGE, messageData);

      // if it's a new chat
      if (!chat?.latestMessage) {
        socket.emit(
          CREATE_CHAT_WITH_MESSAGE,
          {
            ...chat,
            latestMessage: messageData,
          },
          getChatReceiverId(
            loggedInUser as LoginUserResponse,
            chat?.users as User[]
          )
        );
      }
      dispatch(updateChatLatestMessage(messageData));

      messageForm.reset();

      scrollIntoView(); // scroll to bottom
    } catch (error) {
      console.error(error);
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  useEffect(() => {
    if (chat) {
      dispatch(getAllMessages({ chatId: chat._id }));
    }
  }, [chat]);

  useEffect(() => {
    if (!isLoading) {
      scrollIntoView();
    }
  }, [isLoading, scrollIntoView, messages]);

  return (
    <>
      <Paper withBorder bg={"gray.0"} className={classes.chatMessages}>
        <Container
          ref={scrollableRef}
          p={"lg"}
          className={classes.messagesContainer}
        >
          {messages.map((message) => (
            <SingleMessage
              key={message._id}
              message={message}
              isSenderCurrentUser={message.sender._id === loggedInUser?._id}
            />
          ))}
          <div ref={targetRef}></div>
        </Container>
      </Paper>
      <Paper
        withBorder
        p={"md"}
        className={classes.chatInputContainer}
        radius="md"
      >
        <form onSubmit={submitMessage}>
          <Group noWrap spacing={0}>
            <Textarea
              autosize
              w={"100%"}
              placeholder="Your message..."
              minRows={2}
              maxRows={4}
              classNames={{
                root: classes.chatInputRoot,
                input: classes.chatTextArea,
              }}
              onKeyDown={handleKeyDown}
              {...messageForm.getInputProps("content")}
            />
            <ActionIcon type="submit" ml={"md"} size={"xl"}>
              <IconSend />
            </ActionIcon>
          </Group>
        </form>
      </Paper>
    </>
  );
}

export default ChatMessages;
