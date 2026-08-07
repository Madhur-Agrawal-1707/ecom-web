import type { Response } from "express";
import type { ApiErrorResponse, ApiSuccessResponse } from "./auth.types.js";

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
): Response<ApiSuccessResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  errors: string[] = [],
): Response<ApiErrorResponse> {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : [message],
  });
}