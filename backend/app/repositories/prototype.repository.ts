import { Database } from "../../config/database";
import {
  CreatePrototypeDTO,
  UpdatePrototypeDTO,
  FindPrototypeDTO,
  DeletePrototypeDTO,
  ListPrototypeDTO,
  ApprovePrototypeDTO,
} from "../dtos/prototype.dto";

class PrototypeRepository {
  private readonly db = Database.getInstance();

  async list({ projectId }: ListPrototypeDTO) {
    return await this.db.prototype.findMany({ where: { projectId } });
  }

  async findById({ id }: FindPrototypeDTO) {
    return await this.db.prototype.findUnique({ where: { id } });
  }

  async create(data: CreatePrototypeDTO) {
    return await this.db.prototype.create({ data });
  }

  async update({ id, ...data }: UpdatePrototypeDTO & { id: number }) {
    return await this.db.prototype.update({ where: { id }, data });
  }

  async delete({ id }: DeletePrototypeDTO) {
    return await this.db.prototype.delete({ where: { id } });
  }

  async approve({ id, isApproved }: ApprovePrototypeDTO) {
    return await this.db.prototype.update({
      where: { id },
      data: { isApproved },
    });
  }
}

export { PrototypeRepository };
