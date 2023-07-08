import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { UserRole } from "../../features/user/types";
import Loader from "./LoaderWithOverlay";

function Index() {
  const { loggedInUser, isLoading } = useAppSelector(userState);

  if (isLoading) {
    return <Loader />;
  }

  return loggedInUser?.role === UserRole.PUBLIC ? (
    <Navigate to="/communities" replace />
  ) : loggedInUser?.role === UserRole.COMMUNITY ? (
    <Navigate to="/communities" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

export default Index;
