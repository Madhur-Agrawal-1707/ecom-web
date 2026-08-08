import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { AuthLoading } from "../AuthLoading";
import type { UserRole } from "../../types/auth.types";

export interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  /** Where to send an authenticated user whose role isn't allowed. Defaults to "/". */
  fallbackPath?: string;
}

export function RoleGuard({ allowedRoles, children, fallbackPath = "/" }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}