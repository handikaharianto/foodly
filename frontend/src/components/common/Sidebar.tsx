import {
  createStyles,
  Navbar,
  getStylesRef,
  rem,
  UnstyledButton,
} from "@mantine/core";
import {
  IconLogout,
  IconFileDescription,
  IconDashboard,
  IconFiles,
  IconMessage,
  IconHeartHandshake,
  IconBuildingCommunity,
  IconListDetails,
} from "@tabler/icons-react";
import { UserRole } from "../../features/user/types";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { privateAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: theme.shadows.xs,
  },

  navbarLinks: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[9],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 600,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[9],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.red[0],
      color: theme.colors.red[7],
      [`& .${getStylesRef("icon")}`]: {
        color: theme.colors.red[7],
      },
    },
  },
  logoutButton: {},
}));

const publicUserLinks = [
  {
    link: "/communities",
    label: "Browse Communities",
    icon: IconBuildingCommunity,
  },
  { link: "/chat", label: "Chat", icon: IconMessage },
  { link: "/donations", label: "Donations", icon: IconHeartHandshake },
  {
    link: "/community-applications",
    label: "Community Applications",
    icon: IconFileDescription,
  },
];

const communityUserLinks = [
  {
    link: "/communities",
    label: "Browse Communities",
    icon: IconBuildingCommunity,
  },
  { link: "/chat", label: "Chat", icon: IconMessage },
  { link: "/donations", label: "Donations", icon: IconHeartHandshake },
  {
    link: "/donation-requests",
    label: "Donation Requests",
    icon: IconListDetails,
  },
  {
    link: "/community-applications",
    label: "Community Applications",
    icon: IconFileDescription,
  },
];

const administratorLinks = [
  { link: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "/community-requests", label: "Community requests", icon: IconFiles },
];

export type SidebarProps = {
  isSidebarOpen: boolean;
};

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const { classes, cx } = useStyles();
  const { loggedInUser } = useAppSelector(userState);

  const navigate = useNavigate();

  const userRole = loggedInUser?.role;
  const links =
    userRole === UserRole.PUBLIC
      ? publicUserLinks
      : userRole === UserRole.COMMUNITY
      ? communityUserLinks
      : userRole === UserRole.ADMINISTRATOR
      ? administratorLinks
      : [];

  const sidebarLinks = links.map((item) => (
    <NavLink
      className={({ isActive }) =>
        cx(classes.link, {
          [classes.linkActive]: isActive,
        })
      }
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  const logoutUser = () => {
    delete privateAxios.defaults.headers.common.Authorization;
    window.localStorage.clear();
    navigate("/sign-in", { replace: true });

    socket.disconnect();
  };

  return (
    <Navbar
      withBorder={false}
      p="md"
      width={{ sm: 300 }}
      hidden={!isSidebarOpen}
      className={classes.header}
    >
      <Navbar.Section grow className={classes.navbarLinks}>
        {sidebarLinks}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UnstyledButton w="100%" className={classes.link} onClick={logoutUser}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidebar;
