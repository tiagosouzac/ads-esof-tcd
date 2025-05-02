import { ProjectValidator } from "../validators/project.validator";

class ProjectDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly requirements?: Array<{
      title: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>
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
