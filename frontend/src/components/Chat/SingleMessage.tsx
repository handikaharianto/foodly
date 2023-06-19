import {
  Message as MessageUI,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";
import { Text } from "@mantine/core";
import { Message } from "../../features/chat/types";

type SingleMessageProps = {
  message: Message;
  isSenderCurrentUser: boolean;
};

function SingleMessage({ message, isSenderCurrentUser }: SingleMessageProps) {
  return (
    <MessageGroup direction={isSenderCurrentUser ? "outgoing" : "incoming"}>
      <MessageGroup.Header>
        <Text transform="capitalize" weight={500}>
          {message.sender.firstName} {message.sender.lastName}
          {isSenderCurrentUser && " (Me)"}
        </Text>
      </MessageGroup.Header>
      <MessageGroup.Messages>
        <MessageUI
          model={{
            message: message.content,
            position: "single",
            direction: "incoming",
          }}
        />
      </MessageGroup.Messages>
      <MessageGroup.Footer style={{ marginLeft: "auto" }}>
        2 hr ago
      </MessageGroup.Footer>
    </MessageGroup>
  );
}

export default SingleMessage;
