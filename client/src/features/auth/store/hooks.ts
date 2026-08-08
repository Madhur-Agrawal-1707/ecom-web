import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";

/**
 * Typed wrappers around react-redux's hooks. Once `authReducer` is
 * registered in `app/store.ts`, `RootState` will structurally include
 * `{ auth: AuthState }`, matching the selectors in `authSlice.ts`.
 *
 * These live here (not in shared/) because this module was scoped to
 * create files only inside features/auth/. If other features later need
 * the same typed hooks, consider relocating this file to shared/lib/.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;