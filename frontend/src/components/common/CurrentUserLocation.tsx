import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCurrentUserLocation } from "../../features/user/UserSlice";

function CurrentUserLocation() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        setCurrentUserLocation([
          position.coords.longitude,
          position.coords.latitude,
        ])
      );
    });
  }, []);

  return <Outlet />;
}

export default CurrentUserLocation;
