import { Database } from "../../config/database";
import {
  CreateSystemConfigDTO,
  FindSystemConfigDTO,
} from "../dtos/system-config.dto";

class SystemConfigRepository {
  private readonly db = Database.getInstance();

  async find({ key }: FindSystemConfigDTO) {
    return await this.db.systemConfig.findUnique({ where: { key } });
  }

  async create(data: CreateSystemConfigDTO) {
    return await this.db.systemConfig.create({ data });
  }
}

export { SystemConfigRepository };
