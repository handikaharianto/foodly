import { Container, Paper, Text } from "@mantine/core";
import Chart from "react-apexcharts";
import { useAppSelector } from "../../app/hooks";
import { dashboardState } from "../../features/dashboard/DashboardSlice";

function LineChart() {
  const { donationByMonths } = useAppSelector(dashboardState);

  const values = donationByMonths.map((donation) => donation.count);
  const months = donationByMonths.map((donation) => donation.month);

  return (
    <Container fluid px={0}>
      <Text weight={600} mb="xs">
        Donation overview
      </Text>
      <Paper withBorder p="md" radius="md">
        <Chart
          type="area"
          width="100%"
          series={[
            {
              name: "Donations",
              data: values,
            },
          ]}
          options={{
            colors: ["#fa5252"],
            fill: {
              type: "gradient",
              gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            chart: {
              toolbar: { show: false },
              zoom: { enabled: false },
            },
            title: {
              text: `Total donations by Month in ${new Date().getFullYear()}`,
              align: "left",
            },
            xaxis: {
              categories: months,
            },
          }}
        />
      </Paper>
    </Container>
  );
}

export default LineChart;
