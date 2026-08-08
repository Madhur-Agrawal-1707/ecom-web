export type UserRole = "admin" | "customer";

export type AuthProvider = "local" | "google";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProvider;
  createdAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
}

export interface RefreshResponseData {
  accessToken: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}