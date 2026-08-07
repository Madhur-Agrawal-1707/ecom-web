import { z } from "zod";

const jwtConfigSchema = z.object({
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

function loadJwtConfig() {
  const result = jwtConfigSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid JWT configuration. Check your .env file:\n${formatted}`);
  }

  return result.data;
}

const parsedEnv = loadJwtConfig();

export const jwtConfig = {
  accessSecret: parsedEnv.JWT_ACCESS_SECRET,
  refreshSecret: parsedEnv.JWT_REFRESH_SECRET,
  accessExpiresIn: parsedEnv.JWT_ACCESS_EXPIRES_IN,
  refreshExpiresIn: parsedEnv.JWT_REFRESH_EXPIRES_IN,
  isProduction: parsedEnv.NODE_ENV === "production",
};

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export const REFRESH_TOKEN_COOKIE_PATH = "/api/auth";

/**
 * Parses simple duration strings ("15m", "7d", "1h") into milliseconds.
 * Kept intentionally minimal — only the units JWT expiresIn typically uses.
 */
function parseDurationToMs(duration: string): number {
  const match = /^(\d+)([smhd])$/.exec(duration);

  if (!match) {
    throw new Error(
      `Invalid duration format: "${duration}". Expected formats like "15m", "7d".`,
    );
  }

  const value = Number(match[1]);
  const unitToMs: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * unitToMs[match[2]];
}

export const REFRESH_TOKEN_MAX_AGE_MS = parseDurationToMs(jwtConfig.refreshExpiresIn);