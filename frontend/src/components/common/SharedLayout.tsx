import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Flex, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    overflowY: "hidden",
    height: "100vh",
  },
  mainContent: {
    position: "relative",
    overflowY: "auto",
    padding: rem(32),
    flexGrow: 1,
  },
}));

const SharedLayout = () => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.main}>
      <Sidebar />
      <div className={classes.mainContent}>
        <Outlet />
      </div>
    </Flex>
  );
};

export default SharedLayout;
