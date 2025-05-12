import { Outlet } from "react-router-dom";
import { useAuthStore } from "./zustand/auth/auth.store";
import { useEffect } from "react";

export const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
};
