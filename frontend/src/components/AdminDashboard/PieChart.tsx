import { Paper, Stack, Text, useMantineTheme } from "@mantine/core";
import Chart from "react-apexcharts";

import { useAppSelector } from "../../app/hooks";
import { dashboardState } from "../../features/dashboard/DashboardSlice";

function PieChart() {
  const theme = useMantineTheme();

  const { donationStatus } = useAppSelector(dashboardState);

  const donationStatusValues = donationStatus.map((donation) => donation.count);

  return (
    <Stack spacing={0} h="100%">
      <Text weight={600} mb="xs">
        Donation status
      </Text>
      <Paper
        withBorder
        p="xl"
        radius="md"
        h="100%"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Chart
          type="pie"
          width="100%"
          style={{ flexGrow: 1 }}
          series={donationStatusValues}
          options={{
            title: {
              text: "All time donation status",
              align: "center",
            },
            colors: [
              theme.colors.gray[5],
              theme.colors.blue[5],
              theme.colors.red[5],
              theme.colors.green[5],
            ],
            labels: ["Pending", "In Progress", "Rejected", "Received"],
            legend: {
              position: "bottom",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
        />
      </Paper>
    </Stack>
  );
}

export default PieChart;
