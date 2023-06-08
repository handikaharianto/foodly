import { SimpleGrid, createStyles } from "@mantine/core";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatMessages from "../components/Chat/ChatMessages";

const useStyles = createStyles((theme) => ({
  chatGrid: {
    gridTemplateColumns: "0.3fr 0.7fr",
  },
}));

function Chat() {
  const { classes } = useStyles();

  return (
    <SimpleGrid spacing={0} className={classes.chatGrid} h={"100%"}>
      <ChatSidebar />
      <ChatMessages />
    </SimpleGrid>
  );
}

export default Chat;
