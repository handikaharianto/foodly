import { Paper, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  chatPaper: {
    borderLeftWidth: "0!important",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

function ChatMessages() {
  const { classes } = useStyles();

  return (
    <Paper withBorder className={classes.chatPaper} p={"lg"}>
      aa
    </Paper>
  );
}

export default ChatMessages;
