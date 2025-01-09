import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpScreen from "./pages/SignUpScreen";
import LogInScreen from "./pages/LogInScreen";
import { useAuthStore } from "./store/useAuthStore";
import HomeScreen from "./pages/HomeScreen";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

const App = () => {
  const { getUser, user, isLoading } = useAuthStore();
  console.log("user", user);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isLoading && !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUpScreen />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LogInScreen />}
        />
        <Route
          path="/"
          element={user ? <HomeScreen /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
