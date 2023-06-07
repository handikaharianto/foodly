import {
  Title,
  TextInput,
  Textarea,
  Group,
  Button,
  Container,
  Select,
  Paper,
  MultiSelect,
  Modal,
  createStyles,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useMemo } from "react";
import { IconBrandVite, IconReportSearch } from "@tabler/icons-react";
import ReactMapGl, { GeolocateControl, Marker, useControl } from "react-map-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  communityApplicationState,
  createCommunityApplication,
  getAllCommunityApplications,
} from "../features/communityApplication/CommunityApplicationSlice";
import Loader from "./common/LoaderWithOverlay";
import { CommunityApplicationStatus } from "../features/communityApplication/types";
import MainContent from "./common/MainContent";
import EmptyState from "./common/EmptyState";
import { useDisclosure } from "@mantine/hooks";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Geocoder from "./common/Geocoder";

const useStyles = createStyles((theme) => ({
  modalContent: {
    overflowY: "visible",
  },
  modalBody: {
    height: "500px",
    width: "800px",
  },
}));

type CommunityApplicationFormType = {
  name: string;
  type: string;
  typeOthers?: string;
  foodPreferences: string[];
  description: string;
};

const CommunityApplication = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading, communityApplications } = useAppSelector(
    communityApplicationState
  );
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const form = useForm<CommunityApplicationFormType>({
    initialValues: {
      name: "",
      type: "",
      typeOthers: "",
      foodPreferences: [],
      description: "",
    },

    validate: {
      name: isNotEmpty("Community name is required."),
      type: isNotEmpty("Community type is required"),
      typeOthers: (value, values) =>
        values.type !== "Others"
          ? null
          : value?.trim() === ""
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

    // if (formData.type !== "Others") {
    //   delete formData.typeOthers;
    // } else {
    //   formData = { ...formData, type: formData.typeOthers! };
    //   delete formData.typeOthers;
    // }

    // try {
    //   dispatch(createCommunityApplication(formData));
    // } catch (error) {
    //   // display error dialog here
    // }
  });

  useEffect(() => {
    dispatch(
      getAllCommunityApplications({
        status: CommunityApplicationStatus.PENDING,
      })
    );
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainContent heading={"Community Applications"}>
      {communityApplications.length > 0 ? (
        <EmptyState
          Icon={IconReportSearch}
          title={"Your community application is currently being reviewed."}
        />
      ) : (
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
                disabled={isLoading}
                label="Community name"
                placeholder="ABC community"
                {...form.getInputProps("name")}
              />
              <Select
                withAsterisk
                disabled={isLoading}
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
                  disabled={isLoading}
                  label="Community type (Others)"
                  placeholder=""
                  mt="md"
                  {...form.getInputProps("typeOthers")}
                />
              )}
              <MultiSelect
                withAsterisk
                disabled={isLoading}
                mt="md"
                placeholder="Select food preferences"
                label="Food preferences"
                {...form.getInputProps("foodPreferences")}
                data={[
                  "Halal",
                  "Non-Halal",
                  "Canned",
                  "Fruits",
                  "Vegetables",
                  "Baked",
                  "Packaged",
                ]}
              />
              <Button mt="md" variant="outline" color="red" onClick={open}>
                Add community location
              </Button>
              <Modal
                centered
                opened={opened}
                onClose={close}
                classNames={{
                  content: classes.modalContent,
                  body: classes.modalBody,
                }}
              >
                <ReactMapGl
                  reuseMaps
                  initialViewState={{
                    latitude: 3.0633808896596406,
                    longitude: 101.69701345766993,
                    zoom: 8,
                  }}
                  mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                  mapStyle={import.meta.env.VITE_MAPBOX_MAP_STYLE}
                  onClick={(e) => {
                    console.log(e.lngLat);
                    console.log(e.features);
                    console.log(e.point);
                    console.log(e.type);
                  }}
                  onLoad={(e) => console.log(e.type)}
                >
                  <Marker
                    anchor="bottom"
                    latitude={3.0633808896596406}
                    longitude={101.69701345766993}
                    color="#fa5252"
                  />
                  <GeolocateControl
                    showUserLocation
                    trackUserLocation
                    showUserHeading
                    position="top-left"
                    onGeolocate={(e) => {
                      console.log(e.coords);
                      console.log(e.timestamp);
                      console.log(e.target);
                    }}
                  />
                  <Geocoder />
                </ReactMapGl>
              </Modal>
              <Textarea
                withAsterisk
                disabled={isLoading}
                label="Description"
                placeholder="Our community is helping..."
                minRows={4}
                mt="md"
                {...form.getInputProps("description")}
              />
              <Group position="center" mt="md">
                <Button type="submit" color="red.6" loading={isLoading}>
                  Submit
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      )}
    </MainContent>
  );
};

export default CommunityApplication;
