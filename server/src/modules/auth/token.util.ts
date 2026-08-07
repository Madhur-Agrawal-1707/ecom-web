import jwt from "jsonwebtoken";
import { jwtConfig } from "./jwt.config.js";
import type { IAccessTokenPayload, IRefreshTokenPayload } from "./auth.interfaces.js";
import { AppError } from "./errors.util.js";

export function generateAccessToken(payload: IAccessTokenPayload): string {
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
  });
}

export function generateRefreshToken(payload: IRefreshTokenPayload): string {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  });
}

export function verifyAccessToken(token: string): IAccessTokenPayload {
  try {
    return jwt.verify(token, jwtConfig.accessSecret) as IAccessTokenPayload;
  } catch {
    throw AppError.unauthorized("Invalid or expired access token");
  }
}

export function verifyRefreshToken(token: string): IRefreshTokenPayload {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret) as IRefreshTokenPayload;
  } catch {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }
}