import { sendError } from "./response.util.js";
export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
            sendError(res, 400, "Validation failed", errors);
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map