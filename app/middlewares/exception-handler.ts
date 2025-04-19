import type { Request, Response, NextFunction } from "express";
import { NotFoundException } from "app/exceptions/not-found";
import { UnexpectedErrorException } from "app/exceptions/unexpected-error";
import { Exception } from "app/exceptions/exception";

type HandlerFunction = (error: Exception) => {
  status: number;
  error: { name: string; message: string; details?: Record<string, any> };
};

class ExceptionHandler {
  private static handlers: Map<Function, HandlerFunction> = new Map([
    [NotFoundException, ExceptionHandler.handleNotFound],
    [UnexpectedErrorException, ExceptionHandler.handleUnexpectError],
  ]);

  static async handle(
    error: Exception | Error,
    _: Request,
    response: Response,
    __: NextFunction
  ) {
    console.error(error);

    const handler =
      ExceptionHandler.handlers.get(error.constructor) ??
      ExceptionHandler.handleUnexpectError;

    const exception = handler(error);

    response.status(exception.status).json(exception.error);
  }

  private static handleNotFound(error: NotFoundException) {
    return {
      status: 404,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }

  private static handleUnexpectError(error: UnexpectedErrorException) {
    return {
      status: 500,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
}

export { ExceptionHandler };
