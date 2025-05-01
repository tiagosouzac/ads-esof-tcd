import { NextFunction, Request, Response } from "express";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";
import { ConflictException } from "../exceptions/conflict.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

class ExceptionHandler {
  static handle(
    error: Error,
    _: Request,
    response: Response,
    __: NextFunction
  ) {
    console.error(error.stack);

    if (
      error instanceof UnauthorizedException ||
      error instanceof NotFoundException ||
      error instanceof ConflictException ||
      error instanceof UnprocessableContentException ||
      error instanceof InternalServerErrorException
    ) {
      response.status(error.statusCode).json({
        name: error.name,
        message: error.message,
        details: error.details,
      });

      return;
    }

    response.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
}

export { ExceptionHandler };
