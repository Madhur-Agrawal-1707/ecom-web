import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import {
  clearCredentials,
  selectAuthError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  setCredentials,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "../store";

export interface UseAuthResult {
  user: ReturnType<typeof selectCurrentUser>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Single source of truth for "is the visitor logged in right now." Runs the
 * /me query (which the interceptor will silently back with a refresh-token
 * exchange on first load) and keeps `authSlice` in sync with the result.
 * ProtectedRoute and RoleGuard both consume this instead of duplicating
 * the query + dispatch wiring.
 */
export function useAuth(): UseAuthResult {
  const dispatch = useAppDispatch();
  const query = useCurrentUser();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(setLoading(query.isPending));
  }, [query.isPending, dispatch]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setCredentials({ user: query.data }));
    }
  }, [query.isSuccess, query.data, dispatch]);

  useEffect(() => {
    if (query.isError) {
      dispatch(clearCredentials());
    }
  }, [query.isError, dispatch]);

  return { user, isAuthenticated, isLoading, error };
}