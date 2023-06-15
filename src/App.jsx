import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import { useAuthContext } from "./hooks/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Feeds from "./pages/Feeds";
import CreatePage from "./pages/CreatePage";
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
          <Route path='/create' element={<CreatePage />} />
          <Route path='/explore' element={<>explore</>} />
          <Route path='/search' element={<>search</>} />
          <Route path='/reels' element={<>reels</>} />
          <Route path='/messages' element={<>messages</>} />
          <Route path='/notifications' element={<>notifications</>} />
          <Route path='/profile/:id' element={<UserProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
