import {
  CreateTaskDTO,
  DeleteTaskDTO,
  FindTaskDTO,
  ListTaskDTO,
  UpdateTaskDTO,
} from "../dtos/task.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import { TaskRepository } from "../repositories/task.repository";

class TaskService {
  private readonly repository = new TaskRepository();

  async list({ projectId }: ListTaskDTO) {
    return await this.repository.list(projectId);
  }

  async find({ id }: FindTaskDTO) {
    const task = await this.repository.find(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }

    return task;
  }

  async create({ title, description, status, projectId }: CreateTaskDTO) {
    return await this.repository.create({
      title,
      description,
      status,
      projectId,
    });
  }

  async update({ id, title, description, status }: UpdateTaskDTO) {
    const task = await this.repository.find(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }

    return await this.repository.update(id, {
      title,
      description,
      status,
    });
  }

  async delete({ id }: DeleteTaskDTO) {
    const task = await this.repository.find(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }

    await this.repository.delete(id);
  }
}

export { TaskService };
