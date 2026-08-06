import { configureStore } from "@reduxjs/toolkit";

/**
 * Root store. Intentionally empty — feature slices are added here as
 * they're built, e.g.:
 *
 *   reducer: {
 *     auth: authReducer,
 *     cart: cartReducer,
 *   }
 */
export const store = configureStore({
  reducer: {},
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;