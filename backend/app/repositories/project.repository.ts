import { Database } from "../../config/database";

type ProjectData = {
  name: string;
  description: string;
};

class ProjectRepository {
  private readonly db = Database.getInstance();

  async list() {
    return await this.db.project.findMany();
  }

  async findById(id: number) {
    return await this.db.project.findUnique({
      where: { id },
      include: { requirements: true },
    });
  }

  async findByName(name: string) {
    return await this.db.project.findUnique({
      where: { name },
      include: { requirements: true },
    });
  }

  async create(data: ProjectData) {
    return await this.db.project.create({
      data: { name: data.name, description: data.description },
    });
  }

  async update(id: number, data: Partial<ProjectData>) {
    return await this.db.project.update({
      where: { id },
      data: { name: data.name, description: data.description },
    });
  }

  async delete(id: number) {
    return await this.db.project.delete({ where: { id } });
  }
}

export { ProjectRepository };
