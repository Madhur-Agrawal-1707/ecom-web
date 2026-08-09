import { AppError } from "./errors.util.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./token.util.js";
export class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async register(dto) {
        const existingUser = await this.authRepository.findByEmail(dto.email);
        if (existingUser) {
            throw AppError.conflict("An account with this email already exists");
        }
        const user = await this.authRepository.createUser(dto);
        const tokens = this.issueTokens(user);
        return { user: toSafeUser(user), tokens };
    }
    async login(dto) {
        const user = await this.authRepository.findByEmailWithPassword(dto.email);
        if (!user) {
            throw AppError.unauthorized("Invalid email or password");
        }
        const isPasswordValid = await user.comparePassword(dto.password);
        if (!isPasswordValid) {
            throw AppError.unauthorized("Invalid email or password");
        }
        const tokens = this.issueTokens(user);
        return { user: toSafeUser(user), tokens };
    }
    async logout(userId) {
        // Invalidates every refresh token issued before this point for this user.
        await this.authRepository.incrementTokenVersion(userId);
    }
    async logoutFromRefreshToken(refreshToken) {
        const payload = verifyRefreshToken(refreshToken);
        await this.authRepository.incrementTokenVersion(payload.sub);
    }
    async refresh(refreshToken) {
        const payload = verifyRefreshToken(refreshToken);
        const user = await this.authRepository.findById(payload.sub);
        if (!user) {
            throw AppError.unauthorized("User no longer exists");
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            throw AppError.unauthorized("Refresh token has been revoked");
        }
        return this.issueTokens(user);
    }
    async getMe(userId) {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw AppError.notFound("User not found");
        }
        return toSafeUser(user);
    }
    issueTokens(user) {
        const accessToken = generateAccessToken({ sub: user._id.toString(), role: user.role });
        const refreshToken = generateRefreshToken({
            sub: user._id.toString(),
            tokenVersion: user.tokenVersion,
        });
        return { accessToken, refreshToken };
    }
}
function toSafeUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        createdAt: user.createdAt,
    };
}
//# sourceMappingURL=auth.service.js.map