import { ProjectValidator } from "../validators/project.validator";

class ProjectDTO {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public requirements?: Array<{
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
