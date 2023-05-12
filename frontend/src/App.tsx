import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TestPage from "./components/TestPage";
import SharedLayout from "./components/common/SharedLayout";
import CommunityApplication from "./components/CommunityApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<SharedLayout />}>
          <Route path="/home" element={<TestPage />} />
          <Route path="/notifications" element={<TestPage />} />
          <Route
            path="/community-applications"
            element={<CommunityApplication />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
