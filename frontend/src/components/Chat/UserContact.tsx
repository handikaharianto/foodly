import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";

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

interface UserContactProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

function UserContact({
  image,
  name,
  email,
  icon,
  ...others
}: UserContactProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group noWrap w={"100%"}>
        <Avatar radius="xl" />
        <Group w={"100%"} className={classes.userInfo} spacing={0}>
          <Group noWrap position="apart" miw={"100%"}>
            <Text truncate size="sm" weight={500}>
              {name}asfasasfsafsdfafsasd
            </Text>
            <Text size={"xs"} color="dimmed" className={classes.userTimestamp}>
              2hr ago
            </Text>
          </Group>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Group>
      </Group>
    </UnstyledButton>
  );
}

export default UserContact;
