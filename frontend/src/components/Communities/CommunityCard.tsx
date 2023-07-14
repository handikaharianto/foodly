import {
  Text,
  Badge,
  Card,
  Container,
  Group,
  Title,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";

import { Community } from "../../features/community/types";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { CoordinateType, calculateDistance } from "../../utils/community";

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
  foodPreferences,
  description,
  user,
  coordinate: { latitude, longitude },
}: CommunityCardProps) {
  const { classes } = useStyles();

  const { location } = useAppSelector(userState);

  const distance = calculateDistance(
    location as CoordinateType,
    [longitude, latitude] as CoordinateType,
    { units: "kilometers" }
  );

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
              mt="xs"
              truncate
              transform="capitalize"
              order={3}
              align="left"
              size="h6"
              weight={600}
            >
              {name}
            </Title>
            <Badge color="red" size="sm" radius="sm" variant="outline">
              {type}
            </Badge>
            <Group spacing={"0.3rem"} mt="sm" noWrap position="left">
              <IconMapPin stroke={1} size={18} />
              <Text color="dimmed" size="xs">
                {distance && `${distance} km`}
              </Text>
            </Group>
          </Container>
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
            {user.phoneNumber}
          </Text>
        </Group>
        <Group mt="xl" spacing="0.4rem" tt="capitalize">
          {foodPreferences.map((item) => (
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
      </Card.Section>
    </Card>
  );
}

export default CommunityCard;
