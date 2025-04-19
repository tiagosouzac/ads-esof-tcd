import type { Request, Response } from "express";
import { SessionService } from "app/services/session.service";
import { SessionValidator } from "app/validators/session.validator";

class SessionController {
  constructor(
    private readonly validator = new SessionValidator(),
    private readonly service = new SessionService()
  ) {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response) {
    const { email, password } = this.validator.create(request.body);

    const session = await this.service.create(email, password);

    response.status(201).json({
      session: {
        userId: session.userId,
        token: session.token,
        expiresAt: session.expiresAt,
      },
    });
  }

  async delete(request: Request, response: Response) {
    const token = request.headers.authorization?.replace("Bearer ", "");

    const validated = this.validator.delete({ token });

    await this.service.delete(validated.token);

    response.status(204).end();
  }
}

export { SessionController };
