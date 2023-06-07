import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";

function Geocoder() {
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
  });

  return null;
}

export default Geocoder;
