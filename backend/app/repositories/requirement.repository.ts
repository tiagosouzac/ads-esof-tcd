import { Database } from "../../config/database";
import { RequirementStatus } from "../../infra/database/prisma/generated/prisma";

type RequirementData = {
  title: string;
  description?: string;
  status: RequirementStatus;
  projectId: number;
};

class RequirementRepository {
  private readonly db = Database.getInstance();

  async list(projectId: number) {
    return await this.db.requirement.findMany({ where: { projectId } });
  }

  async findById(id: number) {
    return await this.db.requirement.findUnique({ where: { id } });
  }

  async create(data: RequirementData) {
    return await this.db.requirement.create({ data });
  }

  async update(id: number, data: Partial<RequirementData>) {
    return await this.db.requirement.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.db.requirement.delete({ where: { id } });
  }
}

export { RequirementRepository };
