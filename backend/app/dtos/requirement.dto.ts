import { RequirementValidator } from "../validators/requirement.validator";

class RequirementDTO {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly projectId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

type ListRequirementDTO = ReturnType<
  typeof RequirementValidator.prototype.list
>;

type FindRequirementDTO = ReturnType<
  typeof RequirementValidator.prototype.find
>;

type CreateRequirementDTO = ReturnType<
  typeof RequirementValidator.prototype.create
>;

type UpdateRequirementDTO = ReturnType<
  typeof RequirementValidator.prototype.update
>;

type DeleteRequirementDTO = ReturnType<
  typeof RequirementValidator.prototype.delete
>;

export {
  RequirementDTO,
  ListRequirementDTO,
  FindRequirementDTO,
  CreateRequirementDTO,
  UpdateRequirementDTO,
  DeleteRequirementDTO,
};
