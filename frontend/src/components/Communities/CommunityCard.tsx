import {
  ActionIcon,
  Text,
  Badge,
  Card,
  Container,
  Group,
  Title,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconDotsVertical, IconMail, IconPhone } from "@tabler/icons-react";

import { getTimeFromNow } from "../../utils/DateAndTime";
import { Community } from "../../features/community/types";

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s",
    "&:hover": {
      boxShadow: theme.shadows.sm,
      scale: "1.01",
    },
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
  },
}));

type CommunityCardProps = Community;

function CommunityCard({
  _id,
  name,
  type,
  description,
  user,
  createdAt,
}: CommunityCardProps) {
  const { classes } = useStyles();

  return (
    <Card
      key={_id}
      withBorder
      padding="xl"
      radius="md"
      to={`/communities/${_id}`}
      component={Link}
      className={classes.card}
    >
      <Card.Section withBorder p="lg">
        <Group noWrap align="center" position="apart">
          <Container p={0} m={0} miw="0%">
            <Title
              truncate
              transform="capitalize"
              order={3}
              align="left"
              size="h6"
              weight={600}
            >
              {name}
            </Title>
            <Badge color="red" size="md" mt="xs" radius="sm" variant="outline">
              {type}
            </Badge>
          </Container>
          {/* <ActionIcon
            miw="0%"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <IconDotsVertical size="1.125rem" />
          </ActionIcon> */}
        </Group>
      </Card.Section>
      <Card.Section p="lg" h="100%" className={classes.cardBody}>
        <Text lineClamp={3} size="sm" mb="auto">
          {description}
        </Text>
        <Group mt="xl">
          <IconMail stroke={1} size={18} />
          <Text color="dimmed" fz="sm">
            {user.email}
          </Text>
        </Group>
        <Group mt="sm">
          <IconPhone stroke={1} size={18} />
          <Text color="dimmed" fz="sm">
            +1 (950) 654-1602
          </Text>
        </Group>
        <Group mt="xl" spacing="0.4rem" tt="capitalize">
          {["Non-halal", "Halal", "Canned goods"].map((item) => (
            <Badge
              key={item}
              color="gray.5"
              radius="sm"
              variant="outline"
              size="sm"
            >
              {item}
            </Badge>
          ))}
        </Group>
        <Text align="right" size="xs" color="dimmed" mt="xl">
          {getTimeFromNow(createdAt.toString())}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default CommunityCard;
