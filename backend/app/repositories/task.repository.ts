import { Database } from "../../config/database";
import {
  CreateTaskDTO,
  DeleteTaskDTO,
  FindTaskDTO,
  ListTaskDTO,
  UpdateTaskDTO,
} from "../dtos/task.dto";

class TaskRepository {
  private readonly db = Database.getInstance();

  async list({ projectId }: ListTaskDTO) {
    return await this.db.task.findMany({
      where: { projectId },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async find({ id }: FindTaskDTO) {
    return await this.db.task.findUnique({
      where: { id },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async create(data: CreateTaskDTO) {
    return await this.db.task.create({
      data,
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async update({ id, ...data }: UpdateTaskDTO) {
    return await this.db.task.update({
      where: { id },
      data,
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async delete({ id }: DeleteTaskDTO) {
    return await this.db.task.delete({ where: { id } });
  }
}

export { TaskRepository };
