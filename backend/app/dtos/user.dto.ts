import { UserValidator } from "../validators/user.validator";

class UserDTO {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role:
      | "MANAGER"
      | "ARCHITECT"
      | "DESIGNER"
      | "DEVELOPER"
      | "QUALITY_ANALYST",
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

type ListUserDTO = ReturnType<typeof UserValidator.prototype.list>;
type FindUserDTO = ReturnType<typeof UserValidator.prototype.find>;
type ShowUserDTO = ReturnType<typeof UserValidator.prototype.show>;
type CreateUserDTO = ReturnType<typeof UserValidator.prototype.create>;
type UpdateUserDTO = ReturnType<typeof UserValidator.prototype.update>;
type DeleteUserDTO = ReturnType<typeof UserValidator.prototype.delete>;
type FindUserByEmailDTO = { email: string };

export {
  UserDTO,
  ListUserDTO,
  FindUserDTO,
  ShowUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
  FindUserByEmailDTO,
};
