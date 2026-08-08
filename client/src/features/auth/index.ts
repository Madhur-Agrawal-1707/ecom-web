// Pages
export { LoginPage } from "./pages/LoginPage";
export { RegisterPage } from "./pages/RegisterPage";

// Route guards
export { ProtectedRoute, type ProtectedRouteProps } from "./components/ProtectedRoute";
export { RoleGuard, type RoleGuardProps } from "./components/RoleGuard";
export { AuthLoading } from "./components/AuthLoading";

// Hooks
export { useAuth, useLogin, useRegister, useLogout, useCurrentUser } from "./hooks";

// Store (for wiring into app/store.ts)
export { authReducer, type AuthState } from "./store";

// Setup (call once at app startup)
export { setupAuthInterceptors } from "./services/auth-interceptors";

// Types
export type { User, UserRole, AuthProvider } from "./types/auth.types";