import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { AuthLoading } from "../AuthLoading";

export interface GuestRouteProps {
  children: ReactNode;
}

interface LocationState {
  from?: { pathname: string };
}

/**
 * Inverse of ProtectedRoute: for pages that only make sense to a
 * logged-out visitor (login, register). An authenticated user hitting
 * these is sent back to wherever they were headed before being bounced
 * to /login (if that's how they got here), or home otherwise.
 */
export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoading />;
  }

  if (isAuthenticated) {
    const state = location.state as LocationState | null;
    const redirectTo = state?.from?.pathname ?? "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}