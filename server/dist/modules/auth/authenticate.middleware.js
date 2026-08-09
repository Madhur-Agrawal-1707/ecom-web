import { verifyAccessToken } from "./token.util.js";
import { sendError } from "./response.util.js";
import { AppError } from "./errors.util.js";
export function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            throw AppError.unauthorized("Access token is missing");
        }
        const token = authHeader.slice("Bearer ".length);
        req.user = verifyAccessToken(token);
        next();
    }
    catch (error) {
        if (error instanceof AppError) {
            sendError(res, error.statusCode, error.message, error.errors);
            return;
        }
        sendError(res, 401, "Authentication failed");
    }
}
//# sourceMappingURL=authenticate.middleware.js.map