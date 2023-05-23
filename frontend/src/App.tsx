import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TestPage from "./components/TestPage";
import SharedLayout from "./components/common/SharedLayout";
import CommunityApplication from "./components/CommunityApplication";
import SetupAxiosInterceptor from "./components/common/SetupAxiosInterceptor";
import AuthGuard from "./components/common/AuthGuard";
import { NotFound } from "./pages/404";
import AuthorizeUser from "./components/common/AuthorizeUser";
import { UserRole } from "./features/user/types";
import { Forbidden } from "./pages/Forbidden";

function App() {
  return (
    <BrowserRouter>
      <SetupAxiosInterceptor>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/unauthorized" element={<Forbidden />} />

          <Route element={<AuthGuard />}>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<TestPage />} />
              <Route path="/notifications" element={<TestPage />} />
              <Route
                element={<AuthorizeUser acceptedRoles={[UserRole.PUBLIC]} />}
              >
                <Route
                  path="/community-applications"
                  element={<CommunityApplication />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SetupAxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
