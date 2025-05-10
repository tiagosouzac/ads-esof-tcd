import { NotFoundException } from "../exceptions/not-found.exception";
import { SystemConfigRepository } from "../repositories/system-config.repository";
import type {
  CreateSystemConfigDTO,
  FindSystemConfigDTO,
} from "../dtos/system-config.dto";
import { ConflictException } from "../exceptions/conflict.exception";

class SystemConfigService {
  private readonly repository = new SystemConfigRepository();

  async find({ key }: FindSystemConfigDTO) {
    return await this.repository.find(key);
  }

  async create({ key, value }: CreateSystemConfigDTO) {
    const config = await this.repository.find(key);

    if (config) {
      throw new ConflictException(`Config with key ${key} already exists!`);
    }

    return await this.repository.create(key, value);
  }
}

export { SystemConfigService };
