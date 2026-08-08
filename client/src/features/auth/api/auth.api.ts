import { api } from "@/lib/axios";
import type {
  ApiSuccessResponse,
  AuthResponseData,
  LoginPayload,
  RefreshResponseData,
  RegisterPayload,
  User,
} from "../types/auth.types";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export async function registerRequest(
  payload: RegisterPayload,
): Promise<AuthResponseData> {
  const { data } = await api.post<ApiSuccessResponse<AuthResponseData>>(
    "/auth/register",
    payload,
  );
  return data.data;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponseData> {
  const { data } = await api.post<ApiSuccessResponse<AuthResponseData>>(
    "/auth/login",
    payload,
  );
  return data.data;
}

export async function logoutRequest(): Promise<void> {
  await api.post<ApiSuccessResponse<null>>("/auth/logout");
}

export async function refreshRequest(): Promise<RefreshResponseData> {
  const { data } = await api.post<ApiSuccessResponse<RefreshResponseData>>(
    "/auth/refresh",
  );
  return data.data;
}

export async function getCurrentUserRequest(): Promise<User> {
  const { data } = await api.get<ApiSuccessResponse<{ user: User }>>("/auth/me");
  return data.data.user;
}