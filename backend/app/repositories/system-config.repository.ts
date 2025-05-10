import { Database } from "../../config/database";

class SystemConfigRepository {
  private readonly db = Database.getInstance();

  async find(key: string) {
    return await this.db.systemConfig.findUnique({ where: { key } });
  }

  async create(key: string, value: string) {
    return await this.db.systemConfig.create({ data: { key, value } });
  }
}

export { SystemConfigRepository };
