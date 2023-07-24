import {
  MultiSelect,
  Paper,
  Select,
  Text,
  TextInput,
  Textarea,
  createStyles,
} from "@mantine/core";

import { useCommunityApplicationFormContext } from "./community-application-context";
import { useAppSelector } from "../../app/hooks";
import { communityApplicationState } from "../../features/communityApplication/CommunityApplicationSlice";

const useStyles = createStyles((theme) => ({
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "5rem",
  },
}));

function CommunityApplicationDetailsForm() {
  const form = useCommunityApplicationFormContext();

  const { isLoading } = useAppSelector(communityApplicationState);

  const { classes } = useStyles();

  return (
    <Paper withBorder p="xl" className={classes.cardGrid} radius="md">
      <div>
        <Text weight={600} mb="xs">
          Community details
        </Text>
        <Text size="sm" color="dimmed">
          Fill up your community details.
        </Text>
      </div>
      <div>
        <TextInput
          withAsterisk
          disabled={isLoading}
          label="Community name"
          placeholder="ABC community"
          {...form.getInputProps("name")}
        />
        <Select
          withAsterisk
          disabled={isLoading}
          mt="md"
          withinPortal
          data={["Orphanage", "Nursing home"]}
          placeholder="Pick one"
          label="Community type"
          {...form.getInputProps("type")}
        />
        <MultiSelect
          withAsterisk
          disabled={isLoading}
          mt="md"
          placeholder="Select food preferences"
          label="Food preferences"
          {...form.getInputProps("foodPreferences")}
          data={[
            "Halal",
            "Non-Halal",
            "Canned",
            "Fruits",
            "Vegetables",
            "Baked",
            "Packaged",
          ]}
        />
        <Textarea
          withAsterisk
          disabled={isLoading}
          label="Description"
          placeholder="Our community is helping..."
          minRows={4}
          mt="md"
          {...form.getInputProps("description")}
        />
      </div>
    </Paper>
  );
}

export default CommunityApplicationDetailsForm;
