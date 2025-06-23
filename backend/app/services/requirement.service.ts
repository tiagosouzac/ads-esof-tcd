import {
  FindRequirementDTO,
  CreateRequirementDTO,
  UpdateRequirementDTO,
  DeleteRequirementDTO,
  ListRequirementDTO,
  ApproveRequirementDTO,
} from "../dtos/requirement.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { RequirementRepository } from "../repositories/requirement.repository";

class RequirementService {
  private readonly repository = new RequirementRepository();

  async list(payload: ListRequirementDTO) {
    return await this.repository.list(payload);
  }

  async find(payload: FindRequirementDTO) {
    const requirement = await this.repository.findById(payload);

    if (!requirement) {
      throw new NotFoundException(
        `Requirement with id ${payload.id} not found!`
      );
    }

    return requirement;
  }

  async create(payload: CreateRequirementDTO) {
    return await this.repository.create(payload);
  }

  async update(payload: UpdateRequirementDTO) {
    const requirement = await this.repository.findById({ id: payload.id });

    if (!requirement) {
      throw new NotFoundException(
        `Requirement with id ${payload.id} not found!`
      );
    }

    return await this.repository.update(payload);
  }

  async delete(payload: DeleteRequirementDTO) {
    const requirement = await this.repository.findById(payload);

    if (!requirement) {
      throw new NotFoundException(
        `Requirement with id ${payload.id} not found!`
      );
    }

    await this.repository.delete(payload);
  }

  async approve(payload: ApproveRequirementDTO, userRole: string) {
    if (userRole !== "MANAGER") {
      throw new UnauthorizedException("Only managers can approve requirements");
    }

    const requirement = await this.repository.findById({ id: payload.id });

    if (!requirement) {
      throw new NotFoundException(
        `Requirement with id ${payload.id} not found!`
      );
    }

    return await this.repository.approve(payload);
  }
}

export { RequirementService };
