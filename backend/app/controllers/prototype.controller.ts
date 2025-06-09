import { Request, Response } from "express";
import { PrototypeService } from "../services/prototype.service";
import { PrototypeValidator } from "../validators/prototype.validator";
import { PrototypeDTO } from "../dtos/prototype.dto";

class PrototypeController {
  private readonly validator = new PrototypeValidator();
  private readonly service = new PrototypeService();

  async list(request: Request, response: Response) {
    const payload = this.validator.list(request.query);
    const prototypes = await this.service.list(payload);

    response
      .status(200)
      .json(
        prototypes.map(
          (prototype) =>
            new PrototypeDTO(
              prototype.id,
              prototype.name,
              prototype.link,
              prototype.projectId,
              prototype.createdAt,
              prototype.updatedAt
            )
        )
      );
  }

  async find(request: Request, response: Response) {
    const payload = this.validator.find(request.params);
    const prototype = await this.service.find(payload);

    response
      .status(200)
      .json(
        new PrototypeDTO(
          prototype.id,
          prototype.name,
          prototype.link,
          prototype.projectId,
          prototype.createdAt,
          prototype.updatedAt
        )
      );
  }

  async create(request: Request, response: Response) {
    const payload = this.validator.create(request.body);
    const prototype = await this.service.create(payload);

    response
      .status(201)
      .json(
        new PrototypeDTO(
          prototype.id,
          prototype.name,
          prototype.link,
          prototype.projectId,
          prototype.createdAt,
          prototype.updatedAt
        )
      );
  }

  async update(request: Request, response: Response) {
    const payload = this.validator.update({
      ...request.params,
      ...request.body,
    });

    const prototype = await this.service.update(payload);

    response
      .status(200)
      .json(
        new PrototypeDTO(
          prototype.id,
          prototype.name,
          prototype.link,
          prototype.projectId,
          prototype.createdAt,
          prototype.updatedAt
        )
      );
  }

  async delete(request: Request, response: Response) {
    const payload = this.validator.delete(request.params);
    await this.service.delete(payload);
    response.status(204).send();
  }
}

export { PrototypeController };
