import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TestPage from "./components/TestPage";
import SharedLayout from "./components/common/SharedLayout";
import CommunityApplication from "./components/CommunityApplication";
import SetupAxiosInterceptor from "./components/common/SetupAxiosInterceptor";
import AuthGuard from "./components/common/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <SetupAxiosInterceptor>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<AuthGuard />}>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<TestPage />} />
              <Route path="/notifications" element={<TestPage />} />
              <Route
                path="/community-applications"
                element={<CommunityApplication />}
              />
            </Route>
          </Route>
        </Routes>
      </SetupAxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
