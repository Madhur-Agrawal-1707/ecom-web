import { sendSuccess, sendError } from "./response.util.js";
import { AppError } from "./errors.util.js";
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_PATH, REFRESH_TOKEN_MAX_AGE_MS, jwtConfig, } from "./jwt.config.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res) => {
        try {
            const { user, tokens } = await this.authService.register(req.body);
            this.setRefreshCookie(res, tokens.refreshToken);
            sendSuccess(res, 201, "Account created successfully", {
                user,
                accessToken: tokens.accessToken,
            });
        }
        catch (error) {
            this.handleError(res, error);
        }
    };
    login = async (req, res) => {
        try {
            const { user, tokens } = await this.authService.login(req.body);
            this.setRefreshCookie(res, tokens.refreshToken);
            sendSuccess(res, 200, "Logged in successfully", {
                user,
                accessToken: tokens.accessToken,
            });
        }
        catch (error) {
            this.handleError(res, error);
        }
    };
    logout = async (req, res) => {
        try {
            const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
            if (refreshToken) {
                await this.authService.logoutFromRefreshToken(refreshToken);
            }
            res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: REFRESH_TOKEN_COOKIE_PATH });
            sendSuccess(res, 200, "Logged out successfully", null);
        }
        catch {
            // Logout is idempotent from the client's perspective: an invalid or
            // already-expired refresh token still results in a cleared cookie.
            res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: REFRESH_TOKEN_COOKIE_PATH });
            sendSuccess(res, 200, "Logged out successfully", null);
        }
    };
    refresh = async (req, res) => {
        try {
            const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
            if (!refreshToken) {
                throw AppError.unauthorized("Refresh token is missing");
            }
            const tokens = await this.authService.refresh(refreshToken);
            this.setRefreshCookie(res, tokens.refreshToken);
            sendSuccess(res, 200, "Token refreshed successfully", {
                accessToken: tokens.accessToken,
            });
        }
        catch (error) {
            this.handleError(res, error);
        }
    };
    me = async (req, res) => {
        try {
            if (!req.user) {
                throw AppError.unauthorized("Authentication required");
            }
            const user = await this.authService.getMe(req.user.sub);
            sendSuccess(res, 200, "Current user retrieved successfully", { user });
        }
        catch (error) {
            this.handleError(res, error);
        }
    };
    setRefreshCookie(res, refreshToken) {
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure: jwtConfig.isProduction,
            sameSite: "lax",
            path: REFRESH_TOKEN_COOKIE_PATH,
            maxAge: REFRESH_TOKEN_MAX_AGE_MS,
        });
    }
    handleError(res, error) {
        if (error instanceof AppError) {
            sendError(res, error.statusCode, error.message, error.errors);
            return;
        }
        sendError(res, 500, "Something went wrong. Please try again.");
    }
}
//# sourceMappingURL=auth.controller.js.map