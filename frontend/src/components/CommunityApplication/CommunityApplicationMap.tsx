import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import {
  Popover,
  TextInput,
  createStyles,
  Button,
  Tooltip,
  Container,
  Center,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAlertCircle, IconMap } from "@tabler/icons-react";

import { publicAxios } from "../../api/axios";
import { useCommunityApplicationFormContext } from "./community-application-context";

// TODO: Add validation when selecting exact community location from map

type LocationResultRes = {
  id: string;
  place_name: string;
  center: string[];
};

export type LocationAutoCompleteType = {
  id: string;
  label: string;
  value: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const useStyles = createStyles((theme) => ({
  autoCompleteButtonRoot: {
    border: 0,
    fontSize: theme.fontSizes.sm,
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
    fontWeight: 400,
    "&:hover": {
      background: theme.colors.gray[1],
    },
  },
  autoCompleteButtonInner: {
    justifyContent: "start",
  },
}));

type CommunityApplicationMapProps = {
  closeModal: () => void;
};

function CommunityApplicationMap({ closeModal }: CommunityApplicationMapProps) {
  const [locationResults, setLocationResults] = useState<
    LocationAutoCompleteType[]
  >([]);
  const [opened, setOpened] = useState(false);
  const [lngLat, setLngLat] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 200);

  const { classes } = useStyles();

  // Mapbox
  const mapboxMap = useRef<Map | null>(null);
  const mapMarker = useRef<Marker | null>(null);

  const form = useCommunityApplicationFormContext();

  const memoizedLocationResults = useMemo(
    () => (debouncedSearchInput.length < 1 ? [] : locationResults),
    [debouncedSearchInput.length, locationResults]
  );

  const confirmCoordinate = () => {
    if (!lngLat) return;

    form.setValues({
      coordinate: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    });

    closeModal();
  };

  const selectLocation = async (location: LocationAutoCompleteType) => {
    // set marker
    mapMarker
      .current!.setLngLat([
        location.coordinate.longitude,
        location.coordinate.latitude,
      ])
      .addTo(mapboxMap.current as Map);

    // jump to location
    mapboxMap.current
      ?.jumpTo({
        center: [location.coordinate.longitude, location.coordinate.latitude],
      })
      .zoomTo(16);

    setLngLat({
      lat: location.coordinate.latitude,
      lng: location.coordinate.longitude,
    });

    setSearchInput(location.value);
    setOpened(false);
  };

  const fetchLocationByGeocode = (lat: number, lng: number) => {
    publicAxios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
        {
          params: {
            access_token: import.meta.env.VITE_MAPBOX_TOKEN,
            limit: 1,
          },
        }
      )
      .then((res) => setSearchInput(res.data.features[0].place_name))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (mapboxMap.current) return; // initialize map only once
    mapboxMap.current = new Map({
      container: "community-application-map",
      style: import.meta.env.VITE_MAPBOX_MAP_STYLE,
      center: [101.68904509676878, 3.136788620294628],
      zoom: 12,
    });

    mapMarker.current = new Marker({
      color: "red",
    });

    mapboxMap.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapboxMap.current.addControl(
      new mapboxgl.GeolocateControl({
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // handle click on map
    mapboxMap.current.on("click", async (event) => {
      mapMarker.current
        ?.setLngLat(event.lngLat)
        .addTo(mapboxMap.current as Map);

      setLngLat({
        lat: event.lngLat.lat,
        lng: event.lngLat.lng,
      });

      fetchLocationByGeocode(event.lngLat.lat, event.lngLat.lng);
    });
  });

  useEffect(() => {
    if (debouncedSearchInput === "") return;

    publicAxios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          debouncedSearchInput
        )}.json`,
        {
          params: {
            proximity: "ip",
            access_token: import.meta.env.VITE_MAPBOX_TOKEN,
          },
        }
      )
      .then((res) => {
        const locations = (
          res.data.features as Array<LocationResultRes>
        ).map<LocationAutoCompleteType>((location) => ({
          id: location.id,
          label: location.place_name,
          value: location.place_name,
          coordinate: {
            latitude: Number(location.center[1]),
            longitude: Number(location.center[0]),
          },
        }));
        setLocationResults(locations);
      })
      .catch((err) => console.log(err));
  }, [debouncedSearchInput]);

  useEffect(() => {
    const latitude = form.values.coordinate.latitude;
    const longitude = form.values.coordinate.longitude;
    if (latitude && longitude) {
      fetchLocationByGeocode(latitude, longitude);

      mapMarker.current
        ?.setLngLat([longitude, latitude])
        .addTo(mapboxMap.current as Map);

      mapboxMap.current
        ?.jumpTo({
          center: [longitude, latitude],
        })
        .zoomTo(16);
    }
  }, [form.values.coordinate.latitude, form.values.coordinate.longitude]);

  console.log({ lngLat });
  console.log(form.values);

  return (
    <Container fluid px={0}>
      <Popover width="target" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <TextInput
            label="Community location"
            description="Find your exact community location."
            placeholder="ABC Street"
            icon={<IconMap size="0.8rem" />}
            rightSection={
              <Tooltip
                label="Click on the map to change the marker position"
                position="top-end"
                withArrow
              >
                <div>
                  <IconAlertCircle
                    size="1rem"
                    style={{ display: "block", opacity: 0.5 }}
                  />
                </div>
              </Tooltip>
            }
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            onFocus={() => setOpened(true)}
            mb="xl"
          />
        </Popover.Target>
        {(debouncedSearchInput.length > 0 || locationResults.length > 0) && (
          <Popover.Dropdown p="0.25rem">
            {memoizedLocationResults.map((location) => (
              <Button
                key={location.id}
                fullWidth
                variant="default"
                classNames={{
                  root: classes.autoCompleteButtonRoot,
                  inner: classes.autoCompleteButtonInner,
                }}
                onClick={() => selectLocation(location)}
              >
                {location.value}
              </Button>
            ))}
          </Popover.Dropdown>
        )}
      </Popover>
      <Container
        fluid
        px={0}
        id="community-application-map"
        className="map-container"
        sx={(theme) => ({
          height: "400px",
          borderRadius: theme.radius.xs,
        })}
      />
      <Center>
        <Button type="button" color="red" mt="xl" onClick={confirmCoordinate}>
          Confirm location
        </Button>
      </Center>
    </Container>
  );
}

export default CommunityApplicationMap;
