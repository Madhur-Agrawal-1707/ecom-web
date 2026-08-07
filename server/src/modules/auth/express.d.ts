import type { IAccessTokenPayload } from "./auth.interfaces.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IAccessTokenPayload;
    }
  }
}

export {};