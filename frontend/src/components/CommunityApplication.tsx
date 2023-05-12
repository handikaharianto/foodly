import {
  Title,
  TextInput,
  Textarea,
  Group,
  Button,
  Container,
  Select,
  Paper,
  Tooltip,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { useMemo } from "react";

const CommunityApplication = () => {
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
      typeOthers: "",
      description: "",
    },

    validate: {
      name: isNotEmpty("Community name is required."),
      type: isNotEmpty("Community type is required"),
      typeOthers: (value, values) =>
        values.type !== "Others"
          ? null
          : value.trim() === ""
          ? "Community type is required"
          : null,
      description: isNotEmpty("Community description is required."),
    },
  });

  const isOthersSelected = useMemo(
    () => form.values.type === "Others",
    [form.values.type]
  );

  const submitForm = form.onSubmit(async (formData) => {
    console.log(formData);
    // submit form to backend (community module)
  });

  return (
    <Container size="sm" mt="4rem">
      <div>
        <Title order={2} size="h1" align="center">
          Tell us a bit about your community
        </Title>
      </div>
      <Paper shadow="md" radius="lg" p="xl" withBorder mt="4rem">
        <form onSubmit={submitForm}>
          <TextInput
            withAsterisk
            label="Community name"
            placeholder="ABC community"
            {...form.getInputProps("name")}
          />
          <Select
            withAsterisk
            mt="md"
            withinPortal
            data={["Orphanage", "Nursing home", "Others"]}
            placeholder="Pick one"
            label="Community type"
            {...form.getInputProps("type")}
          />
          {isOthersSelected && (
            <TextInput
              withAsterisk
              label="Community type (Others)"
              placeholder=""
              mt="md"
              {...form.getInputProps("typeOthers")}
            />
          )}
          <Textarea
            withAsterisk
            label="Description"
            placeholder="Our community is helping..."
            minRows={4}
            mt="md"
            {...form.getInputProps("description")}
            rightSection={
              <Tooltip label="zzz" position="top-end" withArrow>
                <div>
                  <IconAlertCircle
                    size="1rem"
                    style={{ display: "block", opacity: 0.5 }}
                  />
                </div>
              </Tooltip>
            }
          />

          <Group position="center" mt="md">
            <Button type="submit" color="red.6">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default CommunityApplication;
