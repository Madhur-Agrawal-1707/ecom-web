import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/auth.types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  // Starts true: on app load we don't yet know whether the refresh cookie
  // is valid, so the UI should treat auth status as "unresolved" until the
  // first /me check settles.
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearCredentials(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }): User | null =>
  state.auth.user;

export const selectIsAuthenticated = (state: { auth: AuthState }): boolean =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: { auth: AuthState }): boolean =>
  state.auth.isLoading;

export const selectAuthError = (state: { auth: AuthState }): string | null =>
  state.auth.error;