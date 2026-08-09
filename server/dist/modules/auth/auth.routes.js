import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "./auth.repository.js";
import { validateBody } from "./validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validators.js";
import { authenticate } from "./authenticate.middleware.js";
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
export const authRouter = Router();
authRouter.post("/register", validateBody(registerSchema), authController.register);
authRouter.post("/login", validateBody(loginSchema), authController.login);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.post("/refresh", authenticate, authController.refresh);
authRouter.get("/me", authenticate, authController.me);
//# sourceMappingURL=auth.routes.js.map