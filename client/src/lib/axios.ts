import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "../config/env";

const REQUEST_TIMEOUT_MS = 15_000;

export interface ApiErrorShape {
  message: string;
  status: number | null;
  code: string | null;
}

/**
 * Centralized Axios instance for all HTTP calls to the backend.
 * No auth logic here by design — token attachment is a separate,
 * future concern layered on top via `api.interceptors.request.use`.
 */
export const api: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalizedError: ApiErrorShape = {
      message: resolveErrorMessage(error),
      status: error.response?.status ?? null,
      code: error.code ?? null,
    };

    return Promise.reject(normalizedError);
  },
);

function resolveErrorMessage(error: AxiosError): string {
  const data = error.response?.data;

  if (isMessageBearingErrorBody(data)) {
    return data.message;
  }

  if (error.code === "ECONNABORTED") {
    return "The request timed out. Please try again.";
  }

  if (!error.response) {
    return "Unable to reach the server. Check your connection.";
  }

  return "Something went wrong. Please try again.";
}

function isMessageBearingErrorBody(
  data: unknown,
): data is { message: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as { message: unknown }).message === "string"
  );
}