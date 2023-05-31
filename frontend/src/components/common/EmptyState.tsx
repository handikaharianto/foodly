import { Center, Stack, Text, Title } from "@mantine/core";

type EmptyStateProps = {
  Icon: any;
  title: string;
  description?: string;
};

function EmptyState({ Icon, title, description }: EmptyStateProps) {
  return (
    <Center h={"100%"}>
      <Stack w={"40rem"}>
        <Center>
          <Icon stroke={1} size={64} />
        </Center>
        <Title order={3} size="h4" align="center" color="gray.8">
          {title}
        </Title>
        <Text align="center" color="gray.7">
          {description}
        </Text>
      </Stack>
    </Center>
  );
}

export default EmptyState;
