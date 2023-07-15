import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { Message } from "../../features/chat/types";
import { User } from "../../features/user/types";
import { getSender } from "../../utils/chat";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { setChatMessageTime } from "../../utils/DateAndTime";
import { getAllMessages, getOneChat } from "../../features/chat/ChatSlice";

const useStyles = createStyles((theme) => ({
  user: {
    display: "flex",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.colors.gray[3],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
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
  const { classes } = useStyles();

  const { loggedInUser } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const handleChatClick = () => {
    dispatch(getOneChat({ chatId: _id }));
  };

  return (
    <UnstyledButton className={classes.user} onClick={handleChatClick}>
      <Group noWrap w={"100%"}>
        <Avatar radius="xl" />
        <Group w={"100%"} className={classes.userInfo} spacing={0}>
          <Group noWrap position="apart" miw={"100%"}>
            <Text truncate size="sm" weight={500} transform="capitalize">
              {getSender(loggedInUser!, users)}
            </Text>
            <Text size={"xs"} color="dimmed" className={classes.userTimestamp}>
              {setChatMessageTime(updatedAt)}
            </Text>
          </Group>
          <Text truncate color="dimmed" size="xs" mih={"1.1625rem"} miw={"1px"}>
            {latestMessage?.content}
          </Text>
        </Group>
      </Group>
    </UnstyledButton>
  );
}

export default UserContact;
