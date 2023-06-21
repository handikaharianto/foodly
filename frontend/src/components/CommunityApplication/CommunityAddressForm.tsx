import {
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";

import { useCommunityApplicationFormContext } from "./community-application-context";
import { useAppSelector } from "../../app/hooks";
import { communityApplicationState } from "../../features/communityApplication/CommunityApplicationSlice";
import { IconMap } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "5rem",
  },
}));

function CommunityAddressForm() {
  const form = useCommunityApplicationFormContext();

  const { isLoading } = useAppSelector(communityApplicationState);

  const { classes } = useStyles();

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
          {...form.getInputProps("name")}
        />
        <TextInput
          disabled={isLoading}
          label="Address line 2 (Optional)"
          description="(Unit, building, floor, etc.)"
          placeholder=""
          mt="md"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="City"
          placeholder=""
          mt="md"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="Postal code"
          placeholder=""
          mt="md"
          {...form.getInputProps("name")}
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
        >
          Open map
        </Button>
      </div>
    </Paper>
  );
}

export default CommunityAddressForm;
