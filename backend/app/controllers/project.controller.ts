import { Request, Response } from "express";
import { ProjectValidator } from "../validators/project.validator";
import { ProjectService } from "../services/project.service";
import { ProjectDTO } from "../dtos/project.dto";
import { RequirementDTO } from "../dtos/requirement.dto";
import { TaskDTO } from "../dtos/task.dto";
import { PrototypeDTO } from "../dtos/prototype.dto";

class ProjectController {
  private readonly validator = new ProjectValidator();
  private readonly service = new ProjectService();

  async list(_: Request, response: Response) {
    const projects = await this.service.list();

    response.status(200).json(
      projects.map(
        (project) =>
          new ProjectDTO(
            project.id,
            project.name,
            project.description,
            project.createdAt,
            project.updatedAt,
            project.architectId,
            project.designerId,
            project.developerId,
            project.qualityAnalystId,
            project.requirements.map(
              (requirement) =>
                new RequirementDTO(
                  requirement.id,
                  requirement.title,
                  requirement.description,
                  requirement.status,
                  requirement.projectId,
                  requirement.createdAt,
                  requirement.updatedAt
                )
            ),
            project.prototypes.map(
              (prototype) =>
                new PrototypeDTO(
                  prototype.id,
                  prototype.name,
                  prototype.link,
                  prototype.projectId,
                  prototype.createdAt,
                  prototype.updatedAt
                )
            ),
            project.tasks.map(
              (task) =>
                new TaskDTO(
                  task.id,
                  task.title,
                  task.description,
                  task.status,
                  task.assignee,
                  task.createdAt,
                  task.updatedAt
                )
            )
          )
      )
    );
  }

  async find(request: Request, response: Response) {
    const payload = this.validator.find(request.params);
    const project = await this.service.find(payload);

    response.status(200).json(
      new ProjectDTO(
        project.id,
        project.name,
        project.description,
        project.createdAt,
        project.updatedAt,
        project.architectId,
        project.designerId,
        project.developerId,
        project.qualityAnalystId,
        project.requirements.map(
          (requirement) =>
            new RequirementDTO(
              requirement.id,
              requirement.title,
              requirement.description,
              requirement.status,
              requirement.projectId,
              requirement.createdAt,
              requirement.updatedAt
            )
        ),
        project.prototypes.map(
          (prototype) =>
            new PrototypeDTO(
              prototype.id,
              prototype.name,
              prototype.link,
              prototype.projectId,
              prototype.createdAt,
              prototype.updatedAt
            )
        ),
        project.tasks.map(
          (task) =>
            new TaskDTO(
              task.id,
              task.title,
              task.description,
              task.status,
              task.assignee,
              task.createdAt,
              task.updatedAt
            )
        )
      )
    );
  }

  async create(request: Request, response: Response) {
    const payload = this.validator.create(request.body);
    const project = await this.service.create(payload);

    response
      .status(201)
      .json(
        new ProjectDTO(
          project.id,
          project.name,
          project.description,
          project.createdAt,
          project.updatedAt,
          project.architectId,
          project.designerId,
          project.developerId
        )
      );
  }

  async update(request: Request, response: Response) {
    const payload = this.validator.update({
      ...request.params,
      ...request.body,
    });

    const project = await this.service.update(payload);

    response
      .status(200)
      .json(
        new ProjectDTO(
          project.id,
          project.name,
          project.description,
          project.createdAt,
          project.updatedAt,
          project.architectId,
          project.designerId,
          project.developerId
        )
      );
  }

  async delete(request: Request, response: Response) {
    const payload = this.validator.delete(request.params);
    await this.service.delete(payload);
    response.status(204).send();
  }
}

export { ProjectController };
