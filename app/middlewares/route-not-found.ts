import type { Request, Response, NextFunction } from "express";
import { NotFoundException } from "app/exceptions/not-found";

class RouteNotFound {
  static handle(request: Request, _: Response, next: NextFunction) {
    next(new NotFoundException(`Cannot ${request.method} ${request.url}`));
  }
}

export { RouteNotFound };
