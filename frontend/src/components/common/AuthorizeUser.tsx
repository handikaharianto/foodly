import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { UserRole } from "../../features/user/types";
import Loader from "./Loader";

type AuthorizeUserProps = {
  acceptedRoles: UserRole[];
};

const AuthorizeUser = ({ acceptedRoles }: AuthorizeUserProps) => {
  const { loggedInUser, isLoading } = useAppSelector(userState);

  if (isLoading) {
    return <Loader />;
  }

  return acceptedRoles.includes(loggedInUser?.role as UserRole) ? (
    <Outlet />
  ) : loggedInUser ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default AuthorizeUser;
