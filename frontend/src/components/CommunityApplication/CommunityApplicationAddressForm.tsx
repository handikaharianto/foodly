import {
  Button,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";

import { useCommunityApplicationFormContext } from "./community-application-context";
import { useAppSelector } from "../../app/hooks";
import { communityApplicationState } from "../../features/communityApplication/CommunityApplicationSlice";
import { IconMap } from "@tabler/icons-react";
import CommunityApplicationMap from "./CommunityApplicationMap";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "5rem",
  },
}));

function CommunityApplicationAddressForm() {
  const [showCommunityLocationError, setShowCommunityLocationError] =
    useState<boolean>(false);

  const { isLoading } = useAppSelector(communityApplicationState);

  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useCommunityApplicationFormContext();

  return (
    <Paper withBorder p="xl" className={classes.cardGrid}>
      <div>
        <Text weight={600} mb="xs">
          Community address
        </Text>
        <Text size="sm" color="dimmed">
          Provide your community address.
        </Text>
      </div>
      <div>
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="Address line 1"
          description="(Street, number)"
          placeholder="ABC street"
          {...form.getInputProps("address.addressLine1")}
        />
        <TextInput
          disabled={isLoading}
          label="Address line 2 (Optional)"
          description="(Unit, building, floor, etc.)"
          placeholder="ABC buidling"
          mt="md"
          {...form.getInputProps("address.addressLine2")}
        />
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="City"
          placeholder="City ABC"
          mt="md"
          {...form.getInputProps("address.city")}
        />
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="Postal code"
          placeholder="12345"
          mt="md"
          {...form.getInputProps("address.postalCode")}
        />
        <Group mt="md" spacing={0}>
          <Text size="sm" weight={500} display="flex">
            Community location&nbsp;
          </Text>
          <Text size="sm" color="red">
            *
          </Text>
        </Group>
        <Button
          variant="default"
          color="red"
          leftIcon={<IconMap size="0.8rem" />}
          onClick={open}
        >
          Open map
        </Button>
        <Modal
          centered
          size={800}
          opened={opened}
          onClose={close}
          title={
            <Text weight={600}>What is the exact community location?</Text>
          }
        >
          <CommunityApplicationMap
            closeModal={close}
            showCommunityLocationError={showCommunityLocationError}
          />
        </Modal>
      </div>
    </Paper>
  );
}

export default CommunityApplicationAddressForm;
