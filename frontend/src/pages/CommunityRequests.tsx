import { Group, Pagination, Select, Tabs, TextInput } from "@mantine/core";
import MainContent from "../components/common/MainContent";
import {
  IconArrowsSort,
  IconBan,
  IconCircleCheck,
  IconRotate2,
  IconSearch,
  IconStack3,
} from "@tabler/icons-react";
import CommunityRequestPanel from "../components/CommunityRequests/CommunityRequestsPanel";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

export enum CommunityRequestTabsType {
  ALL = "ALL",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

function CommunityRequests() {
  const [searchInput, setSearchInput] = useState("");
  const [debounced] = useDebouncedValue(searchInput, 200);

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
        defaultValue={CommunityRequestTabsType.PENDING}
      >
        <Tabs.List>
          <Tabs.Tab
            value={CommunityRequestTabsType.ALL}
            icon={<IconStack3 size="0.8rem" />}
          >
            All
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityRequestTabsType.PENDING}
            icon={<IconRotate2 size="0.8rem" />}
          >
            Pending
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityRequestTabsType.ACCEPTED}
            icon={<IconCircleCheck size="0.8rem" />}
          >
            Accepted
          </Tabs.Tab>
          <Tabs.Tab
            value={CommunityRequestTabsType.REJECTED}
            icon={<IconBan size="0.8rem" />}
          >
            Rejected
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={CommunityRequestTabsType.ALL} pt="xs">
          <CommunityRequestPanel activeTab={CommunityRequestTabsType.ALL} />
        </Tabs.Panel>

        <Tabs.Panel value={CommunityRequestTabsType.PENDING} pt="xs">
          <CommunityRequestPanel activeTab={CommunityRequestTabsType.PENDING} />
        </Tabs.Panel>

        <Tabs.Panel value={CommunityRequestTabsType.ACCEPTED} pt="xs">
          <CommunityRequestPanel
            activeTab={CommunityRequestTabsType.ACCEPTED}
          />
        </Tabs.Panel>
        <Tabs.Panel value={CommunityRequestTabsType.REJECTED} pt="xs">
          <CommunityRequestPanel
            activeTab={CommunityRequestTabsType.REJECTED}
          />
        </Tabs.Panel>
      </Tabs>
      <Group position="right" mt="2.5rem">
        <Pagination total={10} color="red" />
      </Group>
    </MainContent>
  );
}

export default CommunityRequests;
