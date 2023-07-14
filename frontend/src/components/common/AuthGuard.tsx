import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refreshAccessToken, userState } from "../../features/user/UserSlice";
import LoaderWithOverlay from "./LoaderWithOverlay";
import { privateAxios } from "../../api/axios";
import { USER_OFFLINE, USER_ONLINE, socket } from "../../socket/socket";

const AuthGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { loggedInUser } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    socket.emit(USER_OFFLINE, loggedInUser?._id);
    socket.disconnect();

    delete privateAxios.defaults.headers.common.Authorization;
    window.localStorage.clear();
    navigate("/sign-in", { replace: true });
  };

  useEffect(() => {
    if (!loggedInUser?.accessToken) {
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        logoutUser();
        setIsLoading(false);
        return;
      }
      dispatch(refreshAccessToken({ refreshToken })).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          logoutUser();
        }
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (loggedInUser?.accessToken) {
      socket.connect();
      socket.emit(USER_ONLINE, {
        userId: loggedInUser._id,
        userRole: loggedInUser.role,
      });
    }
  }, [loggedInUser]);

  if (isLoading) {
    return <LoaderWithOverlay />;
  }

  return <Outlet />;
};

export default AuthGuard;
