import { Text, Badge, Card, Group } from "@mantine/core";

function CommunityRequestCard() {
  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>
    </Card>
  );
}

export default CommunityRequestCard;
