import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpScreen from "./pages/SignUpScreen";
import LogInScreen from "./pages/LogInScreen";
import HomeScreen from "./pages/HomeScreen";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, isLoading, authUser } = useAuthStore();
  console.log("authUser", authUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading && !authUser)
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
          element={authUser ? <Navigate to="/" /> : <SignUpScreen />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LogInScreen />}
        />
        <Route
          path="/"
          element={authUser ? <HomeScreen /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
