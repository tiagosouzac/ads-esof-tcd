import type { Request, Response, NextFunction } from "express";
import { NotFoundException } from "app/exceptions/not-found.exception";
import { UnauthorizedException } from "app/exceptions/unauthorized.exception";
import { ForbiddenException } from "app/exceptions/forbidden.exception";
import { UnexpectedErrorException } from "app/exceptions/unexpected-error.exception";
import { UnprocessableContentException } from "app/exceptions/unprocessable-content.exception";
import { Exception } from "app/exceptions/exception";

type HandlerFunction = (error: Exception) => {
  status: number;
  error: { name: string; message: string; details?: Record<string, unknown> };
};

class ExceptionHandler {
  private static handlers: Map<Function, HandlerFunction> = new Map([
    [NotFoundException, ExceptionHandler.handleNotFound],
    [UnauthorizedException, ExceptionHandler.handleUnauthorized],
    [ForbiddenException, ExceptionHandler.handleForbidden],
    [
      UnprocessableContentException,
      ExceptionHandler.handleUnprocessableContent,
    ],
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

  private static handleUnauthorized(error: UnauthorizedException) {
    return {
      status: 401,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }

  private static handleForbidden(error: ForbiddenException) {
    return {
      status: 403,
      error: {
        name: error.name,
        message: error.message,
      },
    };
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

  private static handleUnprocessableContent(
    error: UnprocessableContentException
  ) {
    return {
      status: 422,
      error: {
        name: error.name,
        message: error.message,
        details: error.details,
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
