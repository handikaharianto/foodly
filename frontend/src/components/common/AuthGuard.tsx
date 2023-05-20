import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refreshAccessToken, userState } from "../../features/user/UserSlice";
import Loader from "./Loader";

const AuthGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { loggedInUser } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser?.accessToken) {
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        navigate("/sign-in", { replace: true });
        setIsLoading(false);
        return;
      }
      dispatch(refreshAccessToken({ refreshToken }));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default AuthGuard;
