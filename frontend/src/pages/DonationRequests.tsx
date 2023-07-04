import { Tabs } from "@mantine/core";

import MainContent from "../components/common/MainContent";
import { DonationStatus } from "../features/donation/types";
import DonationListPanel from "../components/DonationRequests/DonationListPanel";
import {
  IconCircleCheck,
  IconCircleX,
  IconLoader,
  IconProgressCheck,
} from "@tabler/icons-react";

function DonationRequests() {
  return (
    <MainContent heading="Donation Requests">
      <Tabs
        keepMounted={false}
        defaultValue={DonationStatus.PENDING}
        color="red"
      >
        <Tabs.List mb="xl">
          <Tabs.Tab
            value={DonationStatus.PENDING}
            icon={<IconLoader size="0.8rem" />}
          >
            Pending
          </Tabs.Tab>
          <Tabs.Tab
            value={DonationStatus.IN_PROGRESS}
            icon={<IconProgressCheck size="0.8rem" />}
          >
            In progress
          </Tabs.Tab>
          <Tabs.Tab
            value={DonationStatus.RECEIVED}
            icon={<IconCircleCheck size="0.8rem" />}
          >
            Received
          </Tabs.Tab>
          <Tabs.Tab
            value={DonationStatus.REJECTED}
            icon={<IconCircleX size="0.8rem" />}
          >
            Rejected
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={DonationStatus.PENDING}>
          <DonationListPanel status={DonationStatus.PENDING} />
        </Tabs.Panel>

        <Tabs.Panel value={DonationStatus.IN_PROGRESS}>
          <DonationListPanel status={DonationStatus.IN_PROGRESS} />
        </Tabs.Panel>

        <Tabs.Panel value={DonationStatus.RECEIVED}>
          <DonationListPanel status={DonationStatus.RECEIVED} />
        </Tabs.Panel>

        <Tabs.Panel value={DonationStatus.REJECTED}>
          <DonationListPanel status={DonationStatus.REJECTED} />
        </Tabs.Panel>
      </Tabs>
    </MainContent>
  );
}

export default DonationRequests;
