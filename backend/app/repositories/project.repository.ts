import { Database } from "../../config/database";
import {
  CreateProjectDTO,
  DeleteProjectDTO,
  FindProjectDTO,
  UpdateProjectDTO,
} from "../dtos/project.dto";

class ProjectRepository {
  private readonly db = Database.getInstance();

  async list() {
    return await this.db.project.findMany({
      include: {
        requirements: true,
        prototypes: true,
        tasks: { include: { assignee: { select: { id: true, name: true } } } },
      },
    });
  }

  async findById({ id }: FindProjectDTO) {
    return await this.db.project.findUnique({
      where: { id },
      include: {
        requirements: true,
        prototypes: true,
        tasks: { include: { assignee: { select: { id: true, name: true } } } },
      },
    });
  }

  async findByName(name: string) {
    return await this.db.project.findUnique({
      where: { name },
      include: { requirements: true },
    });
  }

  async create(data: CreateProjectDTO) {
    return await this.db.project.create({
      data: {
        name: data.name,
        description: data.description,
        architect: { connect: { id: data.architect } },
      },
    });
  }

  async update({ id, ...data }: UpdateProjectDTO) {
    return await this.db.project.update({
      where: { id },
      data: { name: data.name, description: data.description },
    });
  }

  async delete({ id }: DeleteProjectDTO) {
    return await this.db.project.delete({ where: { id } });
  }
}

export { ProjectRepository };
