import { Request, Response } from "express";
import { RequirementValidator } from "../validators/requirement.validator";
import { RequirementService } from "../services/requirement.service";
import { RequirementDTO } from "../dtos/requirement.dto";

class RequirementController {
  private readonly validator = new RequirementValidator();
  private readonly service = new RequirementService();

  async list(request: Request, response: Response) {
    const payload = this.validator.list(request.query);
    const requirements = await this.service.list(payload);

    response
      .status(200)
      .json(
        requirements.map(
          (requirement) =>
            new RequirementDTO(
              requirement.id,
              requirement.title,
              requirement.description,
              requirement.status,
              requirement.projectId,
              requirement.isApproved || false,
              requirement.createdAt,
              requirement.updatedAt
            )
        )
      );
  }

  async find(request: Request, response: Response) {
    const payload = this.validator.find(request.params);
    const requirement = await this.service.find(payload);

    response
      .status(200)
      .json(
        new RequirementDTO(
          requirement.id,
          requirement.title,
          requirement.description,
          requirement.status,
          requirement.projectId,
          requirement.isApproved || false,
          requirement.createdAt,
          requirement.updatedAt
        )
      );
  }

  async create(request: Request, response: Response) {
    const payload = this.validator.create(request.body);
    const requirement = await this.service.create(payload);

    response
      .status(201)
      .json(
        new RequirementDTO(
          requirement.id,
          requirement.title,
          requirement.description,
          requirement.status,
          requirement.projectId,
          requirement.isApproved || false,
          requirement.createdAt,
          requirement.updatedAt
        )
      );
  }

  async update(request: Request, response: Response) {
    const payload = this.validator.update({
      ...request.params,
      ...request.body,
    });

    const requirement = await this.service.update(payload);

    response
      .status(200)
      .json(
        new RequirementDTO(
          requirement.id,
          requirement.title,
          requirement.description,
          requirement.status,
          requirement.projectId,
          requirement.isApproved || false,
          requirement.createdAt,
          requirement.updatedAt
        )
      );
  }

  async delete(request: Request, response: Response) {
    const payload = this.validator.delete(request.params);
    await this.service.delete(payload);
    response.status(204).send();
  }

  async approve(request: Request, response: Response) {
    const payload = this.validator.approve({
      id: request.params.id,
      isApproved: request.body.isApproved,
    });

    const requirement = await this.service.approve(payload, request.user!.role);

    response
      .status(200)
      .json(
        new RequirementDTO(
          requirement.id,
          requirement.title,
          requirement.description,
          requirement.status,
          requirement.projectId,
          requirement.isApproved,
          requirement.createdAt,
          requirement.updatedAt
        )
      );
  }
}

export { RequirementController };
