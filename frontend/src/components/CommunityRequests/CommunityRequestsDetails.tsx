import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
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
import { LngLatLike, Map, Marker } from "mapbox-gl";
import { IconMapPin } from "@tabler/icons-react";

import MainContent from "../common/MainContent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communityApplicationState,
  getOneCommunityApplication,
  updateOneCommunityApplication,
} from "../../features/communityApplication/CommunityApplicationSlice";
import { createCommunity } from "../../features/community/communitySlice";
import LoaderState from "../common/LoaderState";
import { communityState } from "../../features/community/communitySlice";
import { CommunityApplicationStatus } from "../../features/communityApplication/types";
import { modals } from "@mantine/modals";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";
import {
  CoordinateType,
  calculateDistance,
  formatCommunityAddress,
} from "../../utils/community";
import { NewCommunity } from "../../features/community/types";
import { updateOneUser, userState } from "../../features/user/UserSlice";
import { UserRole } from "../../features/user/types";
import { NOTIFICATION, socket } from "../../socket/socket";

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
  const { loggedInUser, location } = useAppSelector(userState);

  const { classes } = useStyles();

  // Mapbox
  const mapboxMap = useRef<Map | null>(null);
  const mapMarker = useRef<Marker | null>(null);

  const distance = calculateDistance(
    location as CoordinateType,
    [
      communityApplication?.coordinate.longitude,
      communityApplication?.coordinate.latitude,
    ] as CoordinateType,
    { units: "kilometers" }
  );

  // TODO: Handle Error from Promise.all
  const acceptCommunityRequest = () => {
    if (!communityApplication) return;

    socket.emit(NOTIFICATION, {
      content: "Congratulations! Your community application has been acepted!",
      sender: loggedInUser?._id,
      receiver: communityApplication.user._id,
      target: UserRole.COMMUNITY,
    });

    Promise.all([
      dispatch(
        createCommunity({
          name: communityApplication.name,
          type: communityApplication.type,
          foodPreferences: communityApplication.foodPreferences,
          description: communityApplication.description,
          address: communityApplication.address,
          coordinate: communityApplication.coordinate,
          user: communityApplication.user._id,
        } as NewCommunity)
      ).unwrap(),
      dispatch(
        updateOneCommunityApplication({
          communityApplicationId: communityApplication!._id,
          status: CommunityApplicationStatus.ACCEPTED,
        })
      ),
    ]).then((res) => {
      const [createCommunityRes, updateOneCommunityApplicationRes] = res;

      dispatch(
        updateOneUser({
          userId: communityApplication.user._id,
          community: createCommunityRes._id,
          role: UserRole.COMMUNITY,
        })
      );
    });
  };

  const rejectCommunityRequest = () => {
    if (!communityApplication) return;

    socket.emit(NOTIFICATION, {
      content:
        "Your community application has been rejected. Please check and submit again later.",
      sender: loggedInUser?._id,
      receiver: communityApplication.user._id,
      target: UserRole.PUBLIC,
    });

    dispatch(
      updateOneCommunityApplication({
        communityApplicationId: communityApplication!._id,
        status: CommunityApplicationStatus.REJECTED,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message: "Community request has been rejected!",
          variant: NotificationVariant.SUCCESS,
        });
      }
    });
  };

  const openRejectCommunityRequestModal = () =>
    modals.openConfirmModal({
      title: <Text weight={600}>Reject community application</Text>,
      centered: true,
      children: (
        <Text size="sm" mb="2.5rem">
          Are you sure you want to reject this community request?
        </Text>
      ),
      labels: { confirm: "Reject", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: rejectCommunityRequest,
    });

  useEffect(() => {
    dispatch(
      getOneCommunityApplication({
        communityApplicationId: communityApplicationId as string,
      })
    );
  }, [communityApplicationId, dispatch]);

  useEffect(() => {
    if (communityAppLoading || communityLoading) return;
    // if (mapboxMap.current) return; // initialize map only once
    mapboxMap.current = new Map({
      container: "community-application-map",
      style: import.meta.env.VITE_MAPBOX_MAP_STYLE,
      center: [101.68904509676878, 3.136788620294628],
      zoom: 12,
    });

    mapMarker.current = new Marker({
      color: "red",
    });

    mapboxMap.current.scrollZoom.disable();
    mapboxMap.current.doubleClickZoom.disable();
    mapboxMap.current.dragPan.disable();
  });

  useEffect(() => {
    if (communityApplication) {
      const latLng: LngLatLike = [
        communityApplication.coordinate.longitude,
        communityApplication.coordinate.latitude,
      ];

      mapMarker.current = new Marker({
        color: "red",
      })
        .setLngLat(latLng)
        .addTo(mapboxMap.current as Map);
      mapboxMap.current?.jumpTo({ center: latLng }).zoomTo(15);
    }
  }, [communityApplication]);

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
              <Group spacing={"0.3rem"} mt="sm" noWrap position="left">
                <IconMapPin stroke={1} size={18} />
                <Text color="dimmed" size="xs">
                  {distance && `${distance} km`}
                </Text>
              </Group>
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
                  onClick={openRejectCommunityRequestModal}
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
              <Card withBorder padding="xl">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Community address
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Text size="sm">
                    {communityApplication &&
                      formatCommunityAddress(communityApplication.address)}
                  </Text>
                </Card.Section>
                <Card.Section px="xl" pb="xl">
                  <Container
                    fluid
                    px={0}
                    id="community-application-map"
                    className="map-container"
                    sx={(theme) => ({
                      position: "relative",
                      height: "400px",
                      width: "100%",
                      borderRadius: theme.radius.xs,
                    })}
                  />
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
                    {communityApplication?.foodPreferences.map((item) => (
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
