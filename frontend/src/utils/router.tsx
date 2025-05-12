import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "../App";
import { ProtectedRoutes, PublicRoutes } from "./protectedRoutes";
import { lazy, Suspense } from "react";
import { Loading } from "../ui-global/Loader";

const WelcomeScreen = lazy(() => import("../views/Welcome/WelcomeScreen"));
const SignUpScreen = lazy(() => import("../views/SignUp/SignUpScreen"));
const LogInScreen = lazy(() => import("../views/LogIn/LogInScreen"));
const ChatScreen = lazy(() => import("../views/Chat/ChatScreen"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <Suspense fallback={<Loading />}>
            <PublicRoutes />
          </Suspense>
        ),
        children: [
          {
            path: "signup",
            element: (
              <Suspense fallback={<Loading />}>
                <SignUpScreen />
              </Suspense>
            ),
          },
          {
            path: "login",
            element: (
              <Suspense fallback={<Loading />}>
                <LogInScreen />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<Loading />}>
                <Navigate to="/signup" />
              </Suspense>
            ),
          },
          {
            path: "/",
            element: (
              <Suspense fallback={<Loading />}>
                <WelcomeScreen />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoutes />
          </Suspense>
        ),
        children: [
          {
            path: "v1/chat/@me",
            element: (
              <Suspense fallback={<Loading />}>
                <ChatScreen />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <Navigate to="/signup" />
      </Suspense>
    ),
  },
]);
