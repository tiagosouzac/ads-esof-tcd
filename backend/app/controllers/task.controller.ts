import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { TaskValidator } from "../validators/task.validator";
import { TaskDTO } from "../dtos/task.dto";

class TaskController {
  private readonly validator = new TaskValidator();
  private readonly service = new TaskService();

  async list(request: Request, response: Response) {
    const payload = this.validator.list(request.query);
    const tasks = await this.service.list(payload);

    response
      .status(200)
      .json(
        tasks.map(
          (task) =>
            new TaskDTO(
              task.id,
              task.title,
              task.description,
              task.status,
              task.assignee,
              task.isApproved || false,
              task.createdAt,
              task.updatedAt
            )
        )
      );
  }

  async find(request: Request, response: Response) {
    const payload = this.validator.find(request.params);
    const task = await this.service.find(payload);

    response
      .status(200)
      .json(
        new TaskDTO(
          task.id,
          task.title,
          task.description,
          task.status,
          task.assignee,
          task.isApproved || false,
          task.createdAt,
          task.updatedAt
        )
      );
  }

  async create(request: Request, response: Response) {
    const payload = this.validator.create(request.body);
    const task = await this.service.create(payload);

    response
      .status(201)
      .json(
        new TaskDTO(
          task.id,
          task.title,
          task.description,
          task.status,
          task.assignee,
          task.isApproved || false,
          task.createdAt,
          task.updatedAt
        )
      );
  }

  async update(request: Request, response: Response) {
    const payload = this.validator.update({
      ...request.params,
      ...request.body,
    });

    const task = await this.service.update(payload);

    response
      .status(200)
      .json(
        new TaskDTO(
          task.id,
          task.title,
          task.description,
          task.status,
          task.assignee,
          task.isApproved || false,
          task.createdAt,
          task.updatedAt
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

    const task = await this.service.approve(payload, request.user!.role);

    response
      .status(200)
      .json(
        new TaskDTO(
          task.id,
          task.title,
          task.description,
          task.status,
          task.assignee,
          task.isApproved,
          task.createdAt,
          task.updatedAt
        )
      );
  }
}

export { TaskController };
