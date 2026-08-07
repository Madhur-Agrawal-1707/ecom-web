export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors.length > 0 ? errors : [message];
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, errors: string[] = []): AppError {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message = "Unauthorized"): AppError {
    return new AppError(message, 401);
  }

  static forbidden(message = "Forbidden"): AppError {
    return new AppError(message, 403);
  }

  static notFound(message = "Not found"): AppError {
    return new AppError(message, 404);
  }

  static conflict(message: string): AppError {
    return new AppError(message, 409);
  }

  static internal(message = "Internal server error"): AppError {
    return new AppError(message, 500);
  }
}