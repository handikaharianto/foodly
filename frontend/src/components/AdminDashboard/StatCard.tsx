import { Group, Paper, Text, createStyles, rem } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

type StatCardProps = {
  title: string;
  value: number | null;
  Icon: (props: TablerIconsProps) => JSX.Element;
};

function StatCard({ title, value, Icon }: StatCardProps) {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="xl" radius="md">
      <Group position="apart">
        <Text
          size="xs"
          color="dimmed"
          className={classes.title}
          transform="capitalize"
        >
          {title}
        </Text>
        <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>{value}</Text>
      </Group>
    </Paper>
  );
}

export default StatCard;
