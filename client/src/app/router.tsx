import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/shared/pages/HomePage";
import { NotFoundPage } from "@/shared/pages/NotFoundPage";
import { GuestRoute, LoginPage, RegisterPage } from "@/features/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);