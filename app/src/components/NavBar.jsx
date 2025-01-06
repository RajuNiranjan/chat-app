import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
  const { authUser } = useAuthStore();
  return <div>Nav Bar</div>;
};

export default NavBar;
