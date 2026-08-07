import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { sendError } from "./response.util.js";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      sendError(res, 400, "Validation failed", errors);
      return;
    }

    req.body = result.data;
    next();
  };
}