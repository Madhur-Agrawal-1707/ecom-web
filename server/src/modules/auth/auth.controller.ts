import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { sendSuccess, sendError } from "./response.util.js";
import { AppError } from "./errors.util.js";
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_PATH,
  REFRESH_TOKEN_MAX_AGE_MS,
  jwtConfig,
} from "./jwt.config.js";
import type { AuthTokens } from "./auth.types.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, tokens } = await this.authService.register(req.body);
      this.setRefreshCookie(res, tokens.refreshToken);
      sendSuccess(res, 201, "Account created successfully", {
        user,
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, tokens } = await this.authService.login(req.body);
      this.setRefreshCookie(res, tokens.refreshToken);
      sendSuccess(res, 200, "Logged in successfully", {
        user,
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] as string | undefined;

      if (refreshToken) {
        await this.authService.logoutFromRefreshToken(refreshToken);
      }

      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: REFRESH_TOKEN_COOKIE_PATH });
      sendSuccess(res, 200, "Logged out successfully", null);
    } catch {
      // Logout is idempotent from the client's perspective: an invalid or
      // already-expired refresh token still results in a cleared cookie.
      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: REFRESH_TOKEN_COOKIE_PATH });
      sendSuccess(res, 200, "Logged out successfully", null);
    }
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] as string | undefined;

      if (!refreshToken) {
        throw AppError.unauthorized("Refresh token is missing");
      }

      const tokens = await this.authService.refresh(refreshToken);
      this.setRefreshCookie(res, tokens.refreshToken);
      sendSuccess(res, 200, "Token refreshed successfully", {
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        throw AppError.unauthorized("Authentication required");
      }

      const user = await this.authService.getMe(req.user.sub);
      sendSuccess(res, 200, "Current user retrieved successfully", { user });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private setRefreshCookie(res: Response, refreshToken: AuthTokens["refreshToken"]): void {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: jwtConfig.isProduction,
      sameSite: "lax",
      path: REFRESH_TOKEN_COOKIE_PATH,
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
  }

  private handleError(res: Response, error: unknown): void {
    if (error instanceof AppError) {
      sendError(res, error.statusCode, error.message, error.errors);
      return;
    }

    sendError(res, 500, "Something went wrong. Please try again.");
  }
}