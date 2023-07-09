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
  Modal,
} from "@mantine/core";
import { LngLatLike, Map, Marker } from "mapbox-gl";

import MainContent from "../../common/MainContent";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { getOneCommunity } from "../../../features/community/communitySlice";
import LoaderState from "../../common/LoaderState";
import { communityState } from "../../../features/community/communitySlice";
import { formatCommunityAddress } from "../../../utils/community";
import { useDisclosure } from "@mantine/hooks";
import DonationCreation from "../../DonationCreation/DonationCreation";

const useStyles = createStyles((theme) => ({
  contentGrid: {
    gridTemplateColumns: "0.7fr 0.3fr",
  },
}));

function CommunityDetails() {
  const { communityId } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, community } = useAppSelector(communityState);

  const { classes } = useStyles();
  const [opened, { open: openDonateModal, close: closeDonateModal }] =
    useDisclosure(false);

  // Mapbox
  const mapboxMap = useRef<Map | null>(null);
  const mapMarker = useRef<Marker | null>(null);

  useEffect(() => {
    dispatch(
      getOneCommunity({
        communityId: communityId as string,
      })
    );
  }, [communityId, dispatch]);

  useEffect(() => {
    // TODO: may not be the best solution as the map will be created on every render
    if (isLoading) return;
    mapboxMap.current = new Map({
      container: "community-application-map",
      style: import.meta.env.VITE_MAPBOX_MAP_STYLE,
      center: [101.68904509676878, 3.136788620294628],
      zoom: 12,
    });

    mapboxMap.current.scrollZoom.disable();
    mapboxMap.current.doubleClickZoom.disable();
    mapboxMap.current.dragPan.disable();
  }, [isLoading]);

  useEffect(() => {
    if (community) {
      const latLng: LngLatLike = [
        community.coordinate.longitude,
        community.coordinate.latitude,
      ];

      mapMarker.current = new Marker({
        color: "red",
      })
        .setLngLat(latLng)
        .addTo(mapboxMap.current as Map);
      mapboxMap.current?.jumpTo({ center: latLng }).zoomTo(15);
    }
  }, [community]);

  return (
    <MainContent heading="Community Details">
      {isLoading ? (
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
                {community?.name}
              </Title>
              <Text color="dimmed" size="sm">
                {community?.type}
              </Text>
            </Stack>
            <Group>
              <Modal
                centered
                withCloseButton={false}
                size="auto"
                opened={opened}
                onClose={closeDonateModal}
                title={
                  <Text weight={600} size="xl" mb="xl" px="md">
                    Fill up your donation details
                  </Text>
                }
              >
                <DonationCreation closeDonateModal={closeDonateModal} />
              </Modal>
              <Button variant="filled" color="red" onClick={openDonateModal}>
                Donate
              </Button>
              <Button variant="default" color="red">
                Contact owner
              </Button>
            </Group>
          </Group>
          <Divider my="xl" color="gray.3" />
          <SimpleGrid className={classes.contentGrid}>
            <Stack>
              <Card withBorder padding="xl" radius="md">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Community description
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Text size="sm">{community?.description}</Text>
                </Card.Section>
              </Card>
              <Card withBorder padding="xl" radius="md">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Community address
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Text size="sm">
                    {community && formatCommunityAddress(community.address)}
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
              <Card withBorder radius="md">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Food preferences
                  </Title>
                </Card.Section>
                <Card.Section p="xl">
                  <Group tt="capitalize">
                    {community?.foodPreferences.map((item) => (
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
              <Card withBorder radius="md">
                <Card.Section withBorder p="xl">
                  <Title order={4} size="h5" weight={600}>
                    Community owner
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
                        {community?.user.firstName} {community?.user.lastName}
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
                      <Text size="sm">{community?.user.email}</Text>
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

export default CommunityDetails;
