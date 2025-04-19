import type { Request, Response } from "express";
import { UserService } from "app/services/user.service";
import { UserValidator } from "app/validators/user.validator";
import { AuthorizationService } from "app/services/authorization.service";
import { Controller } from "core/controller";

class UserController extends Controller {
  private readonly validator = new UserValidator();
  private readonly service = new UserService();
  private readonly authService = new AuthorizationService();

  async list(_: Request, response: Response) {
    const users = await this.service.list();

    response.json({
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })),
    });
  }

  async get(request: Request, response: Response) {
    const { id } = await this.validator.get({ id: request.params.id });

    this.authService.canAccessResource(request.user!, id);

    const user = await this.service.get(id);

    response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }

  async create(request: Request, response: Response) {
    const validatedData = await this.validator.create(request.body);

    const createdUser = await this.service.create({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role,
    });

    response.status(201).json({
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  }

  async update(request: Request, response: Response) {
    const validatedData = await this.validator.update({
      id: request.params.id,
      ...request.body,
    });

    const user = await this.service.update(validatedData.id, {
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role,
    });

    response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = await this.validator.delete({ id: request.params.id });

    await this.service.delete(id);

    response.status(204).end();
  }
}

export { UserController };
