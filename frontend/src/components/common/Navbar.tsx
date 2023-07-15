import {
  ActionIcon,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { FoodlyLogo } from "../../utils/Logo";
import NotificationButton from "../Notification/NotificationButton";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { IconChevronDown, IconUserCircle } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: theme.shadows.xs,
  },
  avatar: {
    boxShadow: theme.shadows.xl,
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  user: {
    color: theme.colors.gray[7],
    padding: `4px 8px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

type NavbarProps = {
  isSidebarOpen: boolean;
  handleIsSidebarOpen: () => void;
};

function Navbar({ isSidebarOpen, handleIsSidebarOpen }: NavbarProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const { loggedInUser } = useAppSelector(userState);

  return (
    <Header
      height={{ base: 56 }}
      px="xl"
      className={classes.header}
      zIndex={120}
      withBorder={false}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isSidebarOpen}
            onClick={handleIsSidebarOpen}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group position="left" mr="auto">
          <FoodlyLogo width={30} height={30} />
          <Text fz="md" fw="bolder">
            Foodly
          </Text>
        </Group>
        <Group position="right">
          <NotificationButton />
          <UnstyledButton className={classes.user}>
            <Group spacing={7}>
              <ActionIcon size={28} variant="transparent" radius="xl">
                <IconUserCircle size="1.125rem" />
              </ActionIcon>
              <Text
                weight={500}
                size="sm"
                sx={{ lineHeight: 1 }}
                mr={3}
                transform="capitalize"
              >
                {loggedInUser?.firstName} {loggedInUser?.lastName}
              </Text>
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Group>
      </div>
    </Header>
  );
}

export default Navbar;
