import { AuthDTO } from "../dtos/auth.dto";
import { UserDTO } from "../dtos/user.dto";
import { AuthService } from "../services/auth.service";
import { AuthValidator } from "../validators/auth.validator";
import type { Request, Response } from "express";

class AuthController {
  private readonly validator = new AuthValidator();
  private readonly service = new AuthService();

  async handle(request: Request, response: Response) {
    const payload = this.validator.handle(request.body);
    const { user, token } = await this.service.login(payload);

    response
      .status(200)
      .json(
        new AuthDTO(
          new UserDTO(
            user.id,
            user.name,
            user.email,
            user.role,
            user.createdAt,
            user.updatedAt
          ),
          token
        )
      );
  }
}

export { AuthController };
