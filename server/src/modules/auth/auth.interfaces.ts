import type { Document, Types } from "mongoose";
import type { UserRole, AuthProvider } from "./auth.types.js";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  provider: AuthProvider;
  googleId?: string;
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

export interface ISafeUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProvider;
  createdAt: Date;
}

export interface IAccessTokenPayload {
  sub: string;
  role: UserRole;
}

export interface IRefreshTokenPayload {
  sub: string;
  tokenVersion: number;
}