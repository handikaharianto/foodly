import { Grid, Group, Paper } from "@mantine/core";
import Stats from "../components/AdminDashboard/Stats";
import MainContent from "../components/common/MainContent";
import PieChart from "../components/AdminDashboard/PieChart";
import LineChart from "../components/AdminDashboard/LineChart";

function AdminDashboard() {
  return (
    <MainContent heading="Dashboard">
      <Stats />
      <Grid mt="xl" gutter="xl">
        <Grid.Col span={7}>
          <LineChart />
        </Grid.Col>
        <Grid.Col span={5}>
          <PieChart />
        </Grid.Col>
      </Grid>
    </MainContent>
  );
}

export default AdminDashboard;
