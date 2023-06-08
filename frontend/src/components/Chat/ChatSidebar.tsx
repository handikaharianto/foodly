import { Input, Paper, ScrollArea, Title, createStyles } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import UserContact from "./UserContact";

const user = {
  image:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  name: "Harriette Spoonlicker",
  email: "hspoonlicker@outlook.com",
};

const useStyles = createStyles((theme) => ({
  chatSidebar: {
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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

    "& > div:first-child": {
      display: "block !important",
      // position: "relative",
      // inset: "0",
    },
  },
}));

function ChatSidebar() {
  const { classes } = useStyles();

  return (
    <Paper withBorder h={"100%"} className={classes.chatSidebar}>
      <Title order={4} size={"h5"} weight={"600"} p={"lg"}>
        Messages
      </Title>
      <Input
        icon={<IconSearch size={"0.8rem"} />}
        placeholder="Search"
        mx={"lg"}
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
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
        <UserContact {...user} />
      </ScrollArea>
    </Paper>
  );
}

export default ChatSidebar;
