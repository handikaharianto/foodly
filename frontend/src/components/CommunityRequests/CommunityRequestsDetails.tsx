import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communityApplicationState,
  getOneCommunityApplication,
  updateOneCommunityApplication,
} from "../../features/communityApplication/CommunityApplicationSlice";
import {
  Text,
  Divider,
  Group,
  Stack,
  Title,
  Button,
  createStyles,
  SimpleGrid,
  Card,
  Container,
  Badge,
} from "@mantine/core";
import { createCommunity } from "../../features/community/communitySlice";
import LoaderState from "../common/LoaderState";
import { communityState } from "../../features/community/communitySlice";
import { CommunityApplicationStatus } from "../../features/communityApplication/types";

//TODO: Add community application status in UI

const useStyles = createStyles((theme) => ({
  contentGrid: {
    gridTemplateColumns: "0.7fr 0.3fr",
  },
}));

function CommunityRequestsDetails() {
  const { communityApplicationId } = useParams();

  const dispatch = useAppDispatch();
  const { communityApplication, isLoading: communityAppLoading } =
    useAppSelector(communityApplicationState);
  const { isLoading: communityLoading } = useAppSelector(communityState);

  const { classes } = useStyles();

  // TODO: Handle Error from Promise.all
  const acceptCommunityRequest = () => {
    Promise.all([
      dispatch(
        createCommunity({
          name: communityApplication!.name,
          type: communityApplication!.type,
          description: communityApplication!.description,
          user: communityApplication!.user._id,
        })
      ),
      dispatch(
        updateOneCommunityApplication({
          communityApplicationId: communityApplication!._id,
          status: CommunityApplicationStatus.ACCEPTED,
        })
      ),
    ]);
  };

  const rejectCommunityRequest = () => {
    console.log("aa");
  };

  useEffect(() => {
    dispatch(
      getOneCommunityApplication({
        communityApplicationId: communityApplicationId as string,
      })
    );
  }, [communityApplicationId, dispatch]);

  return (
    <MainContent heading={"Community Request Details"}>
      {communityAppLoading || communityLoading ? (
        <LoaderState />
      ) : (
        <>
          <Group position="apart">
            <Stack spacing={0}>
              <Title
                transform="capitalize"
                order={3}
                align="left"
                size="h4"
                weight={600}
              >
                {communityApplication?.name}
              </Title>
              <Text color="dimmed" size="sm">
                {communityApplication?.type}
              </Text>
            </Stack>
            {communityApplication?.status ===
              CommunityApplicationStatus.PENDING && (
              <Group>
                <Button
                  variant="filled"
                  color="red"
                  onClick={acceptCommunityRequest}
                >
                  Accept
                </Button>
                <Button
                  variant="subtle"
                  color="red"
                  onClick={rejectCommunityRequest}
                >
                  Reject
                </Button>
              </Group>
            )}
          </Group>
          <Divider my="xl" color="gray.3" />
          <SimpleGrid className={classes.contentGrid}>
            <Stack>
              <Card withBorder padding="xl">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Community description
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Text size="sm">{communityApplication?.description}</Text>
                </Card.Section>
              </Card>
              <Card withBorder>
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Food preferences
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Group tt="capitalize">
                    {["Non-halal", "Halal", "Canned goods"].map((item) => (
                      <Badge
                        key={item}
                        color="red"
                        radius="sm"
                        variant="outline"
                        size="md"
                      >
                        {item}
                      </Badge>
                    ))}
                  </Group>
                </Card.Section>
              </Card>
            </Stack>
            <Container fluid w="100%" p={0}>
              <Card withBorder>
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Submitted by
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Stack spacing="xl">
                    <Stack spacing={0}>
                      <Title
                        order={4}
                        align="left"
                        size="h6"
                        weight={400}
                        color="dimmed"
                      >
                        Full name
                      </Title>
                      <Text transform="capitalize" size="sm">
                        {communityApplication?.user.firstName}{" "}
                        {communityApplication?.user.lastName}
                      </Text>
                    </Stack>
                    <Stack spacing={0}>
                      <Title
                        order={4}
                        align="left"
                        size="h6"
                        weight={400}
                        color="dimmed"
                      >
                        Email
                      </Title>
                      <Text size="sm">{communityApplication?.user.email}</Text>
                    </Stack>
                    <Stack spacing={0}>
                      <Title
                        order={4}
                        align="left"
                        size="h6"
                        weight={400}
                        color="dimmed"
                      >
                        Phone number
                      </Title>
                      <Text size="sm">+1 (950) 654-1602</Text>
                    </Stack>
                  </Stack>
                </Card.Section>
              </Card>
            </Container>
          </SimpleGrid>
        </>
      )}
    </MainContent>
  );
}

export default CommunityRequestsDetails;
