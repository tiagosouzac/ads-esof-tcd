import { Database } from "../../config/database";
import {
  CreateRequirementDTO,
  DeleteRequirementDTO,
  FindRequirementDTO,
  ListRequirementDTO,
  UpdateRequirementDTO,
  ApproveRequirementDTO,
} from "../dtos/requirement.dto";

class RequirementRepository {
  private readonly db = Database.getInstance();

  async list({ projectId }: ListRequirementDTO) {
    return await this.db.requirement.findMany({ where: { projectId } });
  }

  async findById({ id }: FindRequirementDTO) {
    return await this.db.requirement.findUnique({ where: { id } });
  }

  async create(data: CreateRequirementDTO) {
    return await this.db.requirement.create({ data });
  }

  async update({ id, ...data }: UpdateRequirementDTO) {
    return await this.db.requirement.update({ where: { id }, data });
  }

  async delete({ id }: DeleteRequirementDTO) {
    return await this.db.requirement.delete({ where: { id } });
  }

  async approve({ id, isApproved }: ApproveRequirementDTO) {
    return await this.db.requirement.update({
      where: { id },
      data: { isApproved },
    });
  }
}

export { RequirementRepository };
