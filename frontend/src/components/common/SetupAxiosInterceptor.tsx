import { useEffect, useState } from "react";
import { privateAxios, publicAxios } from "../../api/axios";
import { LoginUserResponse } from "../../features/user/types";
import { useNavigate } from "react-router-dom";
import { USER_OFFLINE, socket } from "../../socket/socket";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";

const SetupAxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  const [isSet, setIsSet] = useState(false);

  const { loggedInUser } = useAppSelector(userState);

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = () => {
      socket.emit(USER_OFFLINE, loggedInUser?._id);
      socket.disconnect();

      delete privateAxios.defaults.headers.common.Authorization;
      window.localStorage.clear();
      navigate("/sign-in", { replace: true });
    };

    // TODO: backend returns invalid access token although the access token is not expired yet.
    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          const refreshToken = window.localStorage.getItem("refreshToken");
          if (!refreshToken) {
            logoutUser();
            return Promise.reject(error);
          }

          try {
            // call API endpoint to generate new access token
            const response = await publicAxios.post("/users/refresh", {
              refreshToken,
            });
            const userData: LoginUserResponse = await response.data;

            window.localStorage.setItem("refreshToken", userData.refreshToken);
            error.response.config.headers.Authorization = `Bearer ${userData.accessToken}`;

            return privateAxios(error.config);
          } catch (error) {
            logoutUser();
            return Promise.reject(error);
          }
        }
      }
    );
    setIsSet(true);

    return () => {
      // privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return isSet ? children : <></>;
};

export default SetupAxiosInterceptor;
