import { Container, Paper, Stack, Text, createStyles } from "@mantine/core";
import Chart from "react-apexcharts";

function PieChart() {
  return (
    <Stack spacing={0} h="100%">
      <Text weight={600} mb="xs">
        Food donation status
      </Text>
      <Paper withBorder p="md" radius="md" h="100%">
        <Text color="dimmed" mb={"2.5rem"} size="sm">
          This month statistics
        </Text>
        <Chart
          type="pie"
          width="100%"
          series={[45, 52, 38]}
          options={{
            labels: ["Pending", "Accepted", "Rejected"],
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
