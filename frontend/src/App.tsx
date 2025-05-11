import { Outlet } from "react-router-dom";
import { useAuthStore } from "./zustand/auth/auth.store";
import { useEffect } from "react";

export const App = () => {
  const { user, checkAuth } = useAuthStore();
  console.log(user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
