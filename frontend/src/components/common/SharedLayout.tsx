import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AppShell } from "@mantine/core";
import Navbar from "./Navbar";
import { useState } from "react";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppShell
      padding="2.5rem"
      navbarOffsetBreakpoint="md"
      navbar={<Sidebar isSidebarOpen={isSidebarOpen} />}
      header={
        <Navbar
          isSidebarOpen={isSidebarOpen}
          handleIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)}
        />
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] },
      })}
    >
      <Outlet />
    </AppShell>
  );
};

export default SharedLayout;
