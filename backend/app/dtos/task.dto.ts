import { TaskValidator } from "../validators/task.validator";

class TaskDTO {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly status: string,
    public readonly assignee: { id: number; name: string } | null,
    public readonly isApproved: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

type ListTaskDTO = ReturnType<typeof TaskValidator.prototype.list>;
type FindTaskDTO = ReturnType<typeof TaskValidator.prototype.find>;
type CreateTaskDTO = ReturnType<typeof TaskValidator.prototype.create>;
type UpdateTaskDTO = ReturnType<typeof TaskValidator.prototype.update>;
type DeleteTaskDTO = ReturnType<typeof TaskValidator.prototype.delete>;
type ApproveTaskDTO = ReturnType<typeof TaskValidator.prototype.approve>;

export {
  TaskDTO,
  ListTaskDTO,
  FindTaskDTO,
  CreateTaskDTO,
  UpdateTaskDTO,
  DeleteTaskDTO,
  ApproveTaskDTO,
};
