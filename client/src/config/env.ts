import { z } from "zod";

/**
 * Schema for every environment variable the client is allowed to read.
 * Only VITE_-prefixed variables are ever exposed to the browser by Vite,
 * so this schema doubles as the whitelist of frontend-safe config.
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .min(1, "VITE_API_BASE_URL is required")
    .url("VITE_API_BASE_URL must be a valid URL"),
  VITE_APP_NAME: z.string().min(1).default("Fashion Store"),
  VITE_GOOGLE_CLIENT_ID: z
    .string()
    .min(1, "VITE_GOOGLE_CLIENT_ID is required"),
  VITE_RAZORPAY_KEY_ID: z
    .string()
    .min(1, "VITE_RAZORPAY_KEY_ID is required"),
});

type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid environment configuration. Check your .env file:\n${formatted}`,
    );
  }

  return result.data;
}

/**
 * Validated, typed environment variables.
 * Import this instead of reading `import.meta.env` directly anywhere else
 * in the app, so invalid config fails loudly at startup, not at runtime.
 */
export const env = loadEnv();

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;