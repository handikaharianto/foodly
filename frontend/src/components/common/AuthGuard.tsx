import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refreshAccessToken, userState } from "../../features/user/UserSlice";
import Loader from "./Loader";
import { privateAxios } from "../../api/axios";

const AuthGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { loggedInUser } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    delete privateAxios.defaults.headers.common.Authorization;
    window.localStorage.clear();
    navigate("/sign-in", { replace: true });
  };

  useEffect(() => {
    if (!loggedInUser?.accessToken) {
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        navigate("/sign-in", { replace: true });
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

  if (isLoading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default AuthGuard;
