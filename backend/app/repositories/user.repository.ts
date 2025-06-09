import { Database } from "../../config/database";
import {
  CreateUserDTO,
  DeleteUserDTO,
  FindUserDTO,
  FindUserByEmailDTO,
  UpdateUserDTO,
} from "../dtos/user.dto";

class UserRepository {
  private readonly db = Database.getInstance();

  async count() {
    return await this.db.user.count();
  }

  async list() {
    return await this.db.user.findMany();
  }

  async findById({ id }: FindUserDTO) {
    return await this.db.user.findUnique({ where: { id } });
  }

  async findByEmail({ email }: FindUserByEmailDTO) {
    return await this.db.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDTO) {
    return await this.db.user.create({ data });
  }

  async update({ id, ...data }: UpdateUserDTO) {
    return await this.db.user.update({ where: { id }, data });
  }

  async delete({ id }: DeleteUserDTO) {
    return await this.db.user.delete({ where: { id } });
  }
}

export { UserRepository };
