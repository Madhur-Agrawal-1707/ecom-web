export function sendSuccess(res, statusCode, message, data) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}
export function sendError(res, statusCode, message, errors = []) {
    return res.status(statusCode).json({
        success: false,
        message,
        errors: errors.length > 0 ? errors : [message],
    });
}
//# sourceMappingURL=response.util.js.map