export class AppError extends Error {
    statusCode;
    errors;
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors.length > 0 ? errors : [message];
        Object.setPrototypeOf(this, AppError.prototype);
    }
    static badRequest(message, errors = []) {
        return new AppError(message, 400, errors);
    }
    static unauthorized(message = "Unauthorized") {
        return new AppError(message, 401);
    }
    static forbidden(message = "Forbidden") {
        return new AppError(message, 403);
    }
    static notFound(message = "Not found") {
        return new AppError(message, 404);
    }
    static conflict(message) {
        return new AppError(message, 409);
    }
    static internal(message = "Internal server error") {
        return new AppError(message, 500);
    }
}
//# sourceMappingURL=errors.util.js.map