import { sendError } from "./response.util.js";
export function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            sendError(res, 401, "Authentication required");
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            sendError(res, 403, "You do not have permission to perform this action");
            return;
        }
        next();
    };
}
//# sourceMappingURL=authorize.middleware.js.map