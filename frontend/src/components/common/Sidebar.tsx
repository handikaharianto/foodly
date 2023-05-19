import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Text,
} from "@mantine/core";
import {
  IconBellRinging,
  IconLogout,
  IconHome,
  IconFileDescription,
} from "@tabler/icons-react";
import { FoodlyLogo } from "../../utils/Logo";
import { UserRole } from "../../features/user/types";
import { Link, NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
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
        : theme.colors.gray[6],
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
}));

const publicUserLinks = [
  { link: "/home", label: "Home", icon: IconHome },
  { link: "/notifications", label: "Notifications", icon: IconBellRinging },
  {
    link: "/community-applications",
    label: "Community Applications",
    icon: IconFileDescription,
  },
];

const communityUserLinks = [{ link: "/home", label: "Home", icon: IconHome }];

const administratorLinks = [{ link: "/home", label: "Home", icon: IconHome }];

function Sidebar() {
  const { classes, cx } = useStyles();

  const userRole = window.localStorage.getItem("userRole");
  const currentUserRole =
    userRole === UserRole.PUBLIC
      ? publicUserLinks
      : userRole === UserRole.COMMUNITY
      ? communityUserLinks
      : userRole === UserRole.ADMINISTRATOR
      ? administratorLinks
      : [];

  const links = currentUserRole.map((item) => (
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

  return (
    <Navbar height="100vh" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="left">
          <FoodlyLogo width={40} height={40} />
          <Text fz="xl" fw="bolder">
            Foodly
          </Text>
          {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="#" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidebar;
