import { Outlet } from "react-router-dom";
import { useAuthStore } from "./zustand/auth/auth.store";
import { useEffect } from "react";
import { SideBar } from "./ui-global/SideBar";

export const App = () => {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex h-screen">
      {user && <SideBar />}
      <Outlet />
    </div>
  );
};
