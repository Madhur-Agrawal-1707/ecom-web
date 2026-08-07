import type { NextFunction, Request, Response } from "express";
import { sendError } from "./response.util.js";
import type { UserRole } from "./auth.types.js";

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, "Authentication required");
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(res, 403, "You do not have permission to perform this action");
      return;
    }

    next();
  };
}