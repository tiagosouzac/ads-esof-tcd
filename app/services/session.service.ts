import { NotFoundException } from "app/exceptions/not-found.exception";
import { UnauthorizedException } from "app/exceptions/unauthorized.exception";
import { Session } from "app/models/session.model";
import { SessionRepository } from "app/repositories/session.repository";
import { UserRepository } from "app/repositories/user.repository";
import { HashService } from "app/services/hash.service";
import { randomBytes } from "node:crypto";

class SessionService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly userRepository = new UserRepository(),
    private readonly hashService = new HashService()
  ) {}

  async getByToken(token: string): Promise<Session | null> {
    const session = await this.sessionRepository.findByToken(token);

    if (!session) {
      return null;
    }

    return this.mapToSessionModel(session);
  }

  async create(email: string, password: string): Promise<Session> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.generateToken();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const session = new Session(user.id, token, expiresAt);

    const createdSession = await this.sessionRepository.insert(session);

    return this.mapToSessionModel(createdSession);
  }

  async delete(token: string): Promise<void> {
    const session = await this.sessionRepository.findByToken(token);

    if (!session) {
      throw new NotFoundException("Session not found");
    }

    await this.sessionRepository.delete(session.id);
  }

  private generateToken(): string {
    return randomBytes(32).toString("hex");
  }

  private mapToSessionModel(sessionData: any): Session {
    return new Session(
      sessionData.user_id,
      sessionData.token,
      sessionData.expires_at,
      sessionData.id,
      sessionData.created_at
    );
  }
}

export { SessionService };
