import {
  Avatar,
  Burger,
  Group,
  Header,
  MediaQuery,
  Menu,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { FoodlyLogo } from "../../utils/Logo";
import { IconUser } from "@tabler/icons-react";
import Notification from "../Notification/Notification";

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: theme.shadows.xs,
  },
}));

type NavbarProps = {
  isSidebarOpen: boolean;
  handleIsSidebarOpen: () => void;
};

function Navbar({ isSidebarOpen, handleIsSidebarOpen }: NavbarProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

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
          <Notification />
          <Menu position="bottom-end">
            <Menu.Target>
              <Avatar
                radius="xl"
                size={28}
                styles={{
                  root: { cursor: "pointer", boxShadow: theme.shadows.xs },
                }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item icon={<IconUser size={14} />}>User profile</Menu.Item>
              <Menu.Item icon={<IconUser size={14} />}>User Settings</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Header>
  );
}

export default Navbar;
