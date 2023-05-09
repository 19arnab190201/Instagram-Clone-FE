import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Feeds from "./pages/Feeds";
const App = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("User", user);
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        <Route element={<HomePage />}>
          <Route index element={<Feeds />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
