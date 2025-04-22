import type { Request, Response, NextFunction } from "express";
import { AuthenticationService } from "app/services/authentication.service";
import { User } from "app/models/user.model";
import { Session } from "app/models/session.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}

class AuthenticationMiddleware {
  private static readonly authService = new AuthenticationService();

  static async handle(request: Request, _: Response, next: NextFunction) {
    try {
      const token = AuthenticationMiddleware.extractTokenFromHeader(request);

      const { user, session } =
        await AuthenticationMiddleware.authService.authenticate(token);

      request.user = user;
      request.session = session;

      next();
    } catch (error) {
      next(error);
    }
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

export { AuthenticationMiddleware };
