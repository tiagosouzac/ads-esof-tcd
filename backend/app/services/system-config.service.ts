import { NotFoundException } from "../exceptions/not-found.exception";
import { SystemConfigRepository } from "../repositories/system-config.repository";
import type {
  CreateSystemConfigDTO,
  FindSystemConfigDTO,
} from "../dtos/system-config.dto";
import { ConflictException } from "../exceptions/conflict.exception";

class SystemConfigService {
  private readonly repository = new SystemConfigRepository();

  async find(payload: FindSystemConfigDTO) {
    return await this.repository.find(payload);
  }

  async create(payload: CreateSystemConfigDTO) {
    const config = await this.repository.find({ key: payload.key });

    if (config) {
      throw new ConflictException(
        `Config with key ${payload.key} already exists!`
      );
    }

    return await this.repository.create(payload);
  }
}

export { SystemConfigService };
