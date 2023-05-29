import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../features/user/UserSlice";
import { UserRole } from "../../features/user/types";
import Loader from "./Loader";

function Index() {
  const { loggedInUser, isLoading } = useAppSelector(userState);

  if (isLoading) {
    return <Loader />;
  }

  return loggedInUser?.role === UserRole.PUBLIC ||
    loggedInUser?.role === UserRole.COMMUNITY ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

export default Index;
