import { PrototypeRepository } from "../repositories/prototype.repository";
import {
  CreatePrototypeDTO,
  UpdatePrototypeDTO,
  FindPrototypeDTO,
  DeletePrototypeDTO,
  ListPrototypeDTO,
} from "../dtos/prototype.dto";
import { NotFoundException } from "../exceptions/not-found.exception";

class PrototypeService {
  private readonly repository = new PrototypeRepository();

  async list(payload: ListPrototypeDTO) {
    return this.repository.list(payload);
  }

  async find(payload: FindPrototypeDTO) {
    const prototype = await this.repository.findById(payload);

    if (!prototype) {
      throw new NotFoundException(`Prototype with id ${payload.id} not found!`);
    }

    return prototype;
  }

  async create(payload: CreatePrototypeDTO) {
    return await this.repository.create(payload);
  }

  async update(payload: UpdatePrototypeDTO) {
    const prototype = await this.repository.findById({ id: payload.id });

    if (!prototype) {
      throw new NotFoundException(`Prototype with id ${payload.id} not found!`);
    }

    return await this.repository.update(payload);
  }

  async delete(payload: DeletePrototypeDTO) {
    const prototype = await this.repository.findById({ id: payload.id });

    if (!prototype) {
      throw new NotFoundException(`Prototype with id ${payload.id} not found!`);
    }

    await this.repository.delete(payload);
  }
}

export { PrototypeService };
