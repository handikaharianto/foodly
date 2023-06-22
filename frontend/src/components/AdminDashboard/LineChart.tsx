import { Container, Paper, Text } from "@mantine/core";
import Chart from "react-apexcharts";

function LineChart() {
  return (
    <Container fluid px={0}>
      <Text weight={600} mb="xs">
        Food donation overview
      </Text>
      <Paper withBorder p="md" radius="md">
        <Text color="dimmed" mb={"2.5rem"} size="sm">
          This month statistics
        </Text>
        <Chart
          type="line"
          width="100%"
          series={[
            {
              name: "Desktops",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            },
          ]}
          options={{
            colors: ["#fa5252"],
            // dataLabels: {
            //   enabled: false,
            // },
            stroke: {
              curve: "smooth",
            },
            // title: {
            //   text: "Product Trends by Month",
            //   align: "left",
            // },
            // grid: {
            //   row: {
            //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            //     opacity: 0.5,
            //   },
            // },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
              ],
            },
          }}
        />
      </Paper>
    </Container>
  );
}

export default LineChart;
