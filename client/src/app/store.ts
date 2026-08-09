import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/store";

/**
 * Root store. Feature slices are added here as they're built.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;