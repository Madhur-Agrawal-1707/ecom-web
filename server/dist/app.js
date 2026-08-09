import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes.js";
import { env } from "./config/env.js";
export function createApp() {
    const app = express();
    // Required for the refresh-token HttpOnly cookie to be sent/received
    // cross-origin between the client and this API.
    app.use(cors({
        origin: env.CLIENT_URL,
        credentials: true,
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api/auth", authRouter);
    app.get("/api/health", (_req, res) => {
        res.status(200).json({ success: true, message: "OK", data: null });
    });
    app.use((_req, res) => {
        res.status(404).json({ success: false, message: "Route not found", errors: [] });
    });
    return app;
}
//# sourceMappingURL=app.js.map