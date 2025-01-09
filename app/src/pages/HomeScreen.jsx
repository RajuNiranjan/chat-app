import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const HomeScreen = () => {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomeScreen;
