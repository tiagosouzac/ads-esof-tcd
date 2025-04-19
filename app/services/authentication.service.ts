import { NotFoundException } from "app/exceptions/not-found.exception";
import { UnauthorizedException } from "app/exceptions/unauthorized.exception";
import { Session } from "app/models/session.model";
import { User } from "app/models/user.model";
import { SessionService } from "app/services/session.service";
import { UserService } from "app/services/user.service";

class AuthenticationService {
  constructor(
    private readonly sessionService = new SessionService(),
    private readonly userService = new UserService()
  ) {}

  async authenticate(
    token: string | undefined
  ): Promise<{ user: User; session: Session }> {
    if (!token) {
      throw new UnauthorizedException("Authentication token not provided");
    }

    const session = await this.sessionService.getByToken(token);

    if (!session) {
      throw new UnauthorizedException("Session not found or invalid");
    }

    if (new Date(session.expiresAt) < new Date()) {
      throw new UnauthorizedException("Session expired");
    }

    const user = await this.userService.get(session.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return { user, session };
  }
}

export { AuthenticationService };
