import { Database } from "../../config/database";
import { Role } from "../../infra/database/prisma/generated/prisma";

type UserData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

class UserRepository {
  private readonly db = Database.getInstance();

  async list() {
    return await this.db.user.findMany();
  }

  async findById(id: number) {
    return await this.db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }

  async create(data: UserData) {
    return await this.db.user.create({ data });
  }

  async update(id: number, data: Partial<UserData>) {
    return await this.db.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.db.user.delete({ where: { id } });
  }
}

export { UserRepository };
