import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeScreen from "./pages/HomeScree";
import LoginScreen from "./pages/LoginScreen";
import SignUpScreen from "./pages/SignUpScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  console.log("authUser", authUser);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomeScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginScreen /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpScreen /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfileScreen /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
