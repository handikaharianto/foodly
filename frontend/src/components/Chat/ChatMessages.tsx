import { Message, MessageGroup } from "@chatscope/chat-ui-kit-react";
import {
  ActionIcon,
  Container,
  Group,
  Paper,
  Textarea,
  createStyles,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

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

function ChatMessages() {
  const { classes } = useStyles();

  return (
    <>
      <Paper withBorder bg={"gray.0"} className={classes.chatMessages}>
        <Container p={"lg"} className={classes.messagesContainer}>
          <MessageGroup direction="incoming">
            <MessageGroup.Header>Harriette Spoonlicker</MessageGroup.Header>
            <MessageGroup.Messages>
              <Message
                model={{
                  message:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus commodi soluta, similique magni doloribus illum ullam ad quidem repellat delectus voluptas alias esse architecto facilis minus optio sed dolor neque?",
                  position: "single",
                  direction: "incoming",
                }}
              />
            </MessageGroup.Messages>
            <MessageGroup.Footer style={{ marginLeft: "auto" }}>
              2 hr ago
            </MessageGroup.Footer>
          </MessageGroup>
          <MessageGroup direction="outgoing">
            <MessageGroup.Header style={{ marginLeft: "auto" }}>
              Harriette Spoonlicker
            </MessageGroup.Header>
            <MessageGroup.Messages>
              <Message
                model={{
                  message:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus commodi soluta, similique magni doloribus illum ullam ad quidem repellat delectus voluptas alias esse architecto facilis minus optio sed dolor neque?",
                  position: "single",
                  direction: "incoming",
                }}
              />
            </MessageGroup.Messages>
            <MessageGroup.Footer>2 hr ago</MessageGroup.Footer>
          </MessageGroup>
        </Container>
      </Paper>
      <Paper withBorder p={"md"} className={classes.chatInputContainer}>
        <form>
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
