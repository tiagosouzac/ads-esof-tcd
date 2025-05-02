import { UserValidator } from "../validators/user.validator";
import { UsersService } from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";
import type { Request, Response } from "express";

class UserController {
  private readonly validator = new UserValidator();
  private readonly service = new UsersService();

  async list(_: Request, response: Response) {
    const users = await this.service.list();

    response
      .status(200)
      .json(
        users.map(
          (user) =>
            new UserDTO(
              user.id,
              user.name,
              user.email,
              user.role,
              user.createdAt,
              user.updatedAt
            )
        )
      );
  }

  async find(request: Request, response: Response) {
    const payload = this.validator.find(request.params);
    const user = await this.service.find(payload);

    response
      .status(200)
      .json(
        new UserDTO(
          user.id,
          user.name,
          user.email,
          user.role,
          user.createdAt,
          user.updatedAt
        )
      );
  }

  async create(request: Request, response: Response) {
    const payload = this.validator.create(request.body);
    const user = await this.service.create(payload);

    response
      .status(201)
      .json(
        new UserDTO(
          user.id,
          user.name,
          user.email,
          user.role,
          user.createdAt,
          user.updatedAt
        )
      );
  }

  async update(request: Request, response: Response) {
    const payload = this.validator.update({
      ...request.params,
      ...request.body,
    });

    const user = await this.service.update(payload);

    response
      .status(200)
      .json(
        new UserDTO(
          user.id,
          user.name,
          user.email,
          user.role,
          user.createdAt,
          user.updatedAt
        )
      );
  }

  async delete(request: Request, response: Response) {
    const payload = this.validator.delete(request.params);
    await this.service.delete(payload);
    response.status(204).send();
  }
}

export { UserController };
