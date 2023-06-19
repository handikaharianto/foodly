import { Paper, SimpleGrid, Stack, createStyles } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatHeader from "../components/Chat/ChatHeader";
import EmptyState from "../components/common/EmptyState";
import { useAppSelector } from "../app/hooks";
import { chatState } from "../features/chat/ChatSlice";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const useStyles = createStyles((theme) => ({
  chatGrid: {
    gridTemplateColumns: "0.3fr 0.7fr",
  },
  messageEmptyState: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: "0 !important",
  },
}));

function Chat() {
  const { classes } = useStyles();

  const { chat } = useAppSelector(chatState);

  return (
    <SimpleGrid spacing={0} className={classes.chatGrid} h={"100%"}>
      <ChatSidebar />
      <Stack spacing={0}>
        {chat ? (
          <>
            <ChatHeader />
            <ChatMessages />
          </>
        ) : (
          <Paper withBorder h={"100%"} className={classes.messageEmptyState}>
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
