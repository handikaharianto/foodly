import { Group, Pagination, Select, Tabs, TextInput } from "@mantine/core";
import MainContent from "../components/common/MainContent";
import {
  IconBan,
  IconCircleCheck,
  IconRotate2,
  IconSearch,
  IconStack3,
} from "@tabler/icons-react";
import CommunityRequestPanel from "../components/CommunityRequests/CommunityRequestsPanel";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { CommunityApplicationStatus } from "../features/communityApplication/types";
import { useAppSelector } from "../app/hooks";
import { communityApplicationState } from "../features/communityApplication/CommunityApplicationSlice";

function CommunityRequests() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 200);

  const { totalPages, communityApplications, isLoading } = useAppSelector(
    communityApplicationState
  );

  return (
    <MainContent heading="Community Requests">
      <Group position="apart" align="center">
        <TextInput
          placeholder="Search"
          icon={<IconSearch size="0.8rem" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
        {/* <Select
          allowDeselect
          withinPortal
          data={[""]}
          placeholder="Sort by"
          icon={<IconArrowsSort size="0.8rem" />}
        /> */}
      </Group>
      <Tabs
        keepMounted={false}
        color="red"
        mt="xl"
        defaultValue={CommunityApplicationStatus.PENDING}
        h={"100%"}
      >
        <Tabs.List>
          <Tabs.Tab
            value={CommunityApplicationStatus.ALL}
            icon={<IconStack3 size="0.8rem" />}
          >
            All
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityApplicationStatus.PENDING}
            icon={<IconRotate2 size="0.8rem" />}
          >
            Pending
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityApplicationStatus.ACCEPTED}
            icon={<IconCircleCheck size="0.8rem" />}
          >
            Accepted
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityApplicationStatus.REJECTED}
            icon={<IconBan size="0.8rem" />}
          >
            Rejected
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel h={"100%"} value={CommunityApplicationStatus.ALL} pt="xs">
          <CommunityRequestPanel
            activeTab={CommunityApplicationStatus.ALL}
            searchInput={debouncedSearchInput}
          />
        </Tabs.Panel>

        <Tabs.Panel
          h={"100%"}
          value={CommunityApplicationStatus.PENDING}
          pt="xs"
        >
          <CommunityRequestPanel
            activeTab={CommunityApplicationStatus.PENDING}
            searchInput={debouncedSearchInput}
          />
        </Tabs.Panel>

        <Tabs.Panel
          h={"100%"}
          value={CommunityApplicationStatus.ACCEPTED}
          pt="xs"
        >
          <CommunityRequestPanel
            activeTab={CommunityApplicationStatus.ACCEPTED}
            searchInput={debouncedSearchInput}
          />
        </Tabs.Panel>
        <Tabs.Panel
          h={"100%"}
          value={CommunityApplicationStatus.REJECTED}
          pt="xs"
        >
          <CommunityRequestPanel
            activeTab={CommunityApplicationStatus.REJECTED}
            searchInput={debouncedSearchInput}
          />
        </Tabs.Panel>
      </Tabs>
      {!isLoading && communityApplications.length > 0 && (
        <Group position="right" mt="2.5rem">
          <Pagination total={totalPages || 1} color="red" />
        </Group>
      )}
    </MainContent>
  );
}

export default CommunityRequests;
