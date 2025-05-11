import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../zustand/auth/auth.store";

export const ProtectedRoutes = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const PublicRoutes = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/v1/chat/@me" />;
  }
  return <Outlet />;
};
