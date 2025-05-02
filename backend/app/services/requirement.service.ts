import {
  FindRequirementDTO,
  CreateRequirementDTO,
  UpdateRequirementDTO,
  DeleteRequirementDTO,
  ListRequirementDTO,
} from "../dtos/requirement.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import { RequirementRepository } from "../repositories/requirement.repository";

class RequirementService {
  private readonly repository = new RequirementRepository();

  async list({ projectId }: ListRequirementDTO) {
    return await this.repository.list(projectId);
  }

  async find({ id }: FindRequirementDTO) {
    const requirement = await this.repository.findById(id);

    if (!requirement) {
      throw new NotFoundException(`Requirement with id ${id} not found!`);
    }

    return requirement;
  }

  async create({ title, description, projectId }: CreateRequirementDTO) {
    return await this.repository.create({
      title,
      description,
      projectId,
    });
  }

  async update({ id, title, description }: UpdateRequirementDTO) {
    const requirement = await this.repository.findById(id);

    if (!requirement) {
      throw new NotFoundException(`Requirement with id ${id} not found!`);
    }

    return await this.repository.update(id, {
      title,
      description,
    });
  }

  async delete({ id }: DeleteRequirementDTO) {
    const requirement = await this.repository.findById(id);

    if (!requirement) {
      throw new NotFoundException(`Requirement with id ${id} not found!`);
    }

    await this.repository.delete(id);
  }
}

export { RequirementService };
