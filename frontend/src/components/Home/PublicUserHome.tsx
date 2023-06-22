import {
  ActionIcon,
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Title,
  Text,
  createStyles,
} from "@mantine/core";
import MainContent from "../common/MainContent";
import { IconDotsVertical, IconMail, IconPhone } from "@tabler/icons-react";
import {
  communityState,
  getAllCommunities,
} from "../../features/community/communitySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { getTimeFromNow } from "../../utils/DateAndTime";
import { useEffect } from "react";

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

function PublicUserHome() {
  const { classes } = useStyles();
  const { isLoading, communityList } = useAppSelector(communityState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCommunities({ limit: 20, page: 1 }));
  }, []);

  return (
    <MainContent heading="Home">
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "lg", cols: 3 },
        ]}
        mt="xl"
      >
        {communityList.map((communityRequest) => (
          <Card
            key={communityRequest._id}
            withBorder
            padding="xl"
            radius="sm"
            to={`/community-requests/${communityRequest._id}`}
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
                  >
                    {communityRequest.name}
                  </Title>
                  <Badge
                    color="red"
                    size="md"
                    mt="xs"
                    radius="sm"
                    variant="outline"
                  >
                    {communityRequest.type}
                  </Badge>
                </Container>
                <ActionIcon
                  miw="0%"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <IconDotsVertical size="1.125rem" />
                </ActionIcon>
              </Group>
            </Card.Section>
            <Card.Section p="lg" h="100%" className={classes.cardBody}>
              <Text lineClamp={3} size="sm" mb="auto">
                {communityRequest.description}
              </Text>
              <Group mt="xl">
                <IconMail stroke={1} size={18} />
                <Text color="dimmed" fz="sm">
                  {communityRequest.user.email}
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
                {getTimeFromNow(communityRequest.createdAt.toString())}
              </Text>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </MainContent>
  );
}

export default PublicUserHome;
