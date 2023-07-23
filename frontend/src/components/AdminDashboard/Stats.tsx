import { SimpleGrid } from "@mantine/core";
import {
  IconUsersGroup,
  IconBuildingCommunity,
  IconHeartHandshake,
} from "@tabler/icons-react";

import { useAppSelector } from "../../app/hooks";
import { dashboardState } from "../../features/dashboard/DashboardSlice";
import StatCard from "./StatCard";

export function Stats() {
  const { totalUsers, totalCommunities, totalDonations } =
    useAppSelector(dashboardState);

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: "lg", cols: 2 },
        { maxWidth: "xs", cols: 1 },
      ]}
    >
      <StatCard title="Total Users" value={totalUsers} Icon={IconUsersGroup} />
      <StatCard
        title="Total Communities"
        value={totalCommunities}
        Icon={IconBuildingCommunity}
      />
      <StatCard
        title="Total Donations"
        value={totalDonations}
        Icon={IconHeartHandshake}
      />
    </SimpleGrid>
  );
}

export default Stats;
