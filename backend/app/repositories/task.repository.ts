import { Database } from "../../config/database";
import { TaskStatus } from "../../infra/database/prisma/generated/prisma";

type TaskData = {
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: number;
  assigneeId: number | null;
};

class TaskRepository {
  private readonly db = Database.getInstance();

  async list(projectId: number) {
    return await this.db.task.findMany({
      where: { projectId },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async find(id: number) {
    return await this.db.task.findUnique({
      where: { id },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async create(data: TaskData) {
    return await this.db.task.create({
      data,
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async update(id: number, data: Partial<TaskData>) {
    return await this.db.task.update({
      where: { id },
      data,
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async delete(id: number) {
    return await this.db.task.delete({ where: { id } });
  }
}

export { TaskRepository };
