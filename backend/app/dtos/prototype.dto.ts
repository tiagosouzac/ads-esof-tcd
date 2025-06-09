import { PrototypeValidator } from "../validators/prototype.validator";

class PrototypeDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly link: string,
    public readonly projectId: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

type ListPrototypeDTO = ReturnType<typeof PrototypeValidator.prototype.list>;

type FindPrototypeDTO = ReturnType<typeof PrototypeValidator.prototype.find>;

type CreatePrototypeDTO = ReturnType<
  typeof PrototypeValidator.prototype.create
>;

type UpdatePrototypeDTO = ReturnType<
  typeof PrototypeValidator.prototype.update
>;

type DeletePrototypeDTO = ReturnType<
  typeof PrototypeValidator.prototype.delete
>;

export {
  PrototypeDTO,
  ListPrototypeDTO,
  FindPrototypeDTO,
  CreatePrototypeDTO,
  UpdatePrototypeDTO,
  DeletePrototypeDTO,
};
