import { ProjectValidator } from "../validators/project.validator";
import { PrototypeDTO } from "./prototype.dto";
import { RequirementDTO } from "./requirement.dto";
import { TaskDTO } from "./task.dto";

class ProjectDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly architectId?: number,
    public readonly designerId?: number,
    public readonly developerId?: number,
    public readonly qualityAnalystId?: number,
    public readonly requirements?: RequirementDTO[],
    public readonly prototypes?: PrototypeDTO[],
    public readonly tasks?: TaskDTO[]
  ) {}
}

type FindProjectDTO = ReturnType<typeof ProjectValidator.prototype.find>;
type CreateProjectDTO = ReturnType<typeof ProjectValidator.prototype.create>;
type UpdateProjectDTO = ReturnType<typeof ProjectValidator.prototype.update>;
type DeleteProjectDTO = ReturnType<typeof ProjectValidator.prototype.delete>;

export {
  ProjectDTO,
  FindProjectDTO,
  CreateProjectDTO,
  UpdateProjectDTO,
  DeleteProjectDTO,
};
