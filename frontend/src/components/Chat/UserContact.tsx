import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  Stack,
} from "@mantine/core";
import { Message } from "../../features/chat/types";
import { User } from "../../features/user/types";
import { getSender } from "../../utils/chat";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { setChatMessageTime } from "../../utils/DateAndTime";
import {
  chatState,
  getAllChats,
  getAllMessages,
  getOneChat,
  updateManyMessages,
} from "../../features/chat/ChatSlice";
import { IconPointFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "flex",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.colors.gray[3],
  },
  userInfo: {
    overflowX: "hidden",
  },
  userTimestamp: {
    whiteSpace: "nowrap",
  },
}));

type UserContactProps = {
  _id: string;
  latestMessage: null | Message;
  users: User[];
  createdAt: string;
  updatedAt: string;
};

function UserContact({
  _id,
  latestMessage,
  users,
  updatedAt,
}: UserContactProps) {
  const { classes, theme } = useStyles();

  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector(userState);
  const { chat } = useAppSelector(chatState);

  const navigate = useNavigate();

  const isSenderCurrentUser = latestMessage?.sender._id === loggedInUser?._id;
  const isLatestMessageRead = latestMessage?.isRead;

  const handleChatClick = () => {
    Promise.all([
      dispatch(
        updateManyMessages({
          chatId: _id,
          receiver: loggedInUser?._id as string,
          isRead: true,
        })
      ),
      dispatch(getOneChat({ chatId: _id })),
      dispatch(getAllMessages({ chatId: _id })),
      dispatch(getAllChats({})),
    ]).then((res) => {
      navigate("/chat");
    });
  };

  return (
    <UnstyledButton
      className={classes.user}
      sx={(theme) => ({
        backgroundColor:
          _id === chat?._id ? theme.colors.gray[2] : "transparent",
        "&:hover": {
          backgroundColor:
            _id === chat?._id ? theme.colors.gray[2] : theme.colors.gray[0],
        },
      })}
      onClick={handleChatClick}
    >
      <Group noWrap w={"100%"}>
        <Avatar radius="xl" />
        <Stack w={"100%"} className={classes.userInfo} spacing={0}>
          <Group noWrap position="apart" miw={"100%"}>
            <Text truncate size="sm" weight={500} transform="capitalize">
              {getSender(loggedInUser!, users)}
            </Text>
            <Text size={"xs"} color="dimmed" className={classes.userTimestamp}>
              {setChatMessageTime(updatedAt)}
            </Text>
          </Group>
          <Group position="apart" h="100%">
            <Text
              truncate
              color="dimmed"
              size="xs"
              mih={"1.1625rem"}
              miw={"1px"}
            >
              {latestMessage?.content}
            </Text>
            {latestMessage && !isSenderCurrentUser && !isLatestMessageRead && (
              <IconPointFilled
                size={18}
                style={{ color: theme.colors.red[7] }}
              />
            )}
          </Group>
        </Stack>
      </Group>
    </UnstyledButton>
  );
}

export default UserContact;
