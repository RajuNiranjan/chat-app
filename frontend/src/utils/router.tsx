import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "../App";
import SignUpScreen from "../views/SignUp/SignUpScreen";
import ChatScreen from "../views/Chat/ChatScreen";
import { ProtectedRoutes, PublicRoutes } from "./protectedRoutes";
import LogInScreen from "../views/LogIn/LogInScreen";
import WelcomeScreen from "../views/Welcome/WelcomeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "signup",
            element: <SignUpScreen />,
          },
          {
            path: "login",
            element: <LogInScreen />,
          },
          {
            path: "*",
            element: <Navigate to="/signup" />,
          },
          {
            path: "/",
            element: <WelcomeScreen />,
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "v1/chat/@me",
            element: <ChatScreen />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/signup" />,
  },
]);
