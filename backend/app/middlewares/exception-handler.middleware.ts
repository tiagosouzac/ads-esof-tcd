import { NextFunction, Request, Response } from "express";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception";

class ExceptionHandler {
  static handle(
    error: Error,
    _: Request,
    response: Response,
    __: NextFunction
  ) {
    console.error(error.stack);

    if (error instanceof InternalServerErrorException) {
      response.status(error.statusCode).json({
        status: "error",
        message: error.name,
        error: error.message,
        details: error.details,
      });
    }

    response.status(500).json({
      status: "error",
      message: error.name,
      error: error.message,
    });
  }
}

export { ExceptionHandler };
