import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "app/exceptions/unauthorized.exception";

type Role = "admin" | "manager" | "hr" | "user";

class AuthorizationMiddleware {
  static hasRole(...allowedRoles: Role[]) {
    return (request: Request, _: Response, next: NextFunction) => {
      try {
        if (!request.user) {
          throw new UnauthorizedException("User not authenticated");
        }

        const userRole = request.user.role as Role;

        if (!allowedRoles.includes(userRole)) {
          throw new UnauthorizedException(
            "You don't have permission to access this resource. Required role: " +
              allowedRoles.join(" or ")
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export { AuthorizationMiddleware };
