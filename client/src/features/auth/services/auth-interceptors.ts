import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { api } from "@/lib/axios";
import { refreshRequest } from "../api/auth.api";
import { clearAccessToken, getAccessToken, setAccessToken } from "./token.service";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isInterceptorAttached = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Registers auth behavior on the shared `api` instance from `@/lib/axios`.
 * Safe to call more than once — it only attaches once per app session.
 * Call this once, near app startup (e.g. from `App.tsx`).
 */
export function setupAuthInterceptors(): void {
  if (isInterceptorAttached) return;
  isInterceptorAttached = true;

  api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;
      const isAuthEndpoint = originalRequest?.url?.includes("/auth/");
      const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");

      const shouldAttemptRefresh =
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isRefreshEndpoint &&
        !(isAuthEndpoint && originalRequest.method === "post");

      if (!shouldAttemptRefresh) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newAccessToken = await getOrCreateRefreshPromise();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    },
  );
}

/**
 * Coalesces concurrent 401s into a single in-flight refresh call, so five
 * simultaneous requests failing at once don't trigger five refresh calls.
 */
function getOrCreateRefreshPromise(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshRequest()
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}