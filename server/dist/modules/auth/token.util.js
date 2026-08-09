import jwt from "jsonwebtoken";
import { jwtConfig } from "./jwt.config.js";
import { AppError } from "./errors.util.js";
export function generateAccessToken(payload) {
    return jwt.sign(payload, jwtConfig.accessSecret, {
        expiresIn: jwtConfig.accessExpiresIn,
    });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, jwtConfig.refreshSecret, {
        expiresIn: jwtConfig.refreshExpiresIn,
    });
}
export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, jwtConfig.accessSecret);
    }
    catch {
        throw AppError.unauthorized("Invalid or expired access token");
    }
}
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, jwtConfig.refreshSecret);
    }
    catch {
        throw AppError.unauthorized("Invalid or expired refresh token");
    }
}
//# sourceMappingURL=token.util.js.map