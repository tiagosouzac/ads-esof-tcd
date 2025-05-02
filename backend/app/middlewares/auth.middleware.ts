import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { JwtService } from "../services/jwt.service";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

class Auth {
  static handle(request: Request, _: Response, next: NextFunction) {
    const authorizationHeader = request.headers["authorization"];
    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException(
        "Authorization token is missing. Please provide a valid token."
      );
    }

    const payload = JwtService.verifyToken({ token });

    request.user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };

    next();
  }
}

export { Auth };
