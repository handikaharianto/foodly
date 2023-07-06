import { useEffect } from "react";
import { Grid } from "@mantine/core";

import Stats from "../components/AdminDashboard/Stats";
import MainContent from "../components/common/MainContent";
import PieChart from "../components/AdminDashboard/PieChart";
import LineChart from "../components/AdminDashboard/LineChart";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  dashboardState,
  getCommunityStats,
  getDonationStats,
  getDonationStatus,
  getTotalDonationsByMonth,
  getUserStats,
} from "../features/dashboard/DashboardSlice";
import LoaderState from "../components/common/LoaderState";

function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(dashboardState);

  useEffect(() => {
    Promise.all([
      dispatch(getUserStats()),
      dispatch(getCommunityStats()),
      dispatch(getDonationStats()),
      dispatch(getDonationStatus()),
      dispatch(getTotalDonationsByMonth()),
    ]);
  }, []);

  return (
    <MainContent heading="Dashboard">
      {isLoading ? (
        <LoaderState />
      ) : (
        <>
          <Stats />
          <Grid mt="xl" gutter="xl">
            <Grid.Col span={7}>
              <LineChart />
            </Grid.Col>
            <Grid.Col span={5}>
              <PieChart />
            </Grid.Col>
          </Grid>
        </>
      )}
    </MainContent>
  );
}

export default AdminDashboard;
