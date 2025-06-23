import {
  ApproveTaskDTO,
  CreateTaskDTO,
  DeleteTaskDTO,
  FindTaskDTO,
  ListTaskDTO,
  UpdateTaskDTO,
} from "../dtos/task.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { TaskRepository } from "../repositories/task.repository";

class TaskService {
  private readonly repository = new TaskRepository();

  async list(payload: ListTaskDTO) {
    return await this.repository.list(payload);
  }

  async find(payload: FindTaskDTO) {
    const task = await this.repository.find(payload);

    if (!task) {
      throw new NotFoundException(`Task with id ${payload.id} not found!`);
    }

    return task;
  }

  async create(payload: CreateTaskDTO) {
    return await this.repository.create(payload);
  }

  async update(payload: UpdateTaskDTO) {
    const task = await this.repository.find({ id: payload.id });

    if (!task) {
      throw new NotFoundException(`Task with id ${payload.id} not found!`);
    }

    return await this.repository.update(payload);
  }

  async delete(payload: DeleteTaskDTO) {
    const task = await this.repository.find(payload);

    if (!task) {
      throw new NotFoundException(`Task with id ${payload.id} not found!`);
    }

    await this.repository.delete(payload);
  }

  async approve(payload: ApproveTaskDTO, userRole: string) {
    if (userRole !== "MANAGER" && userRole !== "QUALITY_ANALYST") {
      throw new UnauthorizedException(
        "Only managers and quality analysts can approve tasks"
      );
    }

    const task = await this.repository.find({ id: payload.id });

    if (!task) {
      throw new NotFoundException(`Task with id ${payload.id} not found!`);
    }

    return await this.repository.approve(payload);
  }
}

export { TaskService };
