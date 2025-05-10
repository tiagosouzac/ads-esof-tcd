import {
  CreateUserDTO,
  DeleteUserDTO,
  FindUserDTO,
  ShowUserDTO,
  UpdateUserDTO,
} from "../dtos/user.dto";
import { ConflictException } from "../exceptions/conflict.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { UserRepository } from "../repositories/user.repository";
import { HashService } from "./hash.service";

class UsersService {
  private readonly repository = new UserRepository();

  async list() {
    return await this.repository.list();
  }

  async find({ id }: FindUserDTO) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return user;
  }

  async show({ id }: ShowUserDTO) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return user;
  }

  async create({ name, email, password, role }: CreateUserDTO) {
    const isEmailRegistered = await this.repository.findByEmail(email);

    if (isEmailRegistered) {
      throw new ConflictException(`User with email ${email} already exists!`);
    }

    return await this.repository.create({
      name,
      email,
      password: await HashService.hashPassword({ password }),
      role,
    });
  }

  async update({ id, name, email, password, role }: UpdateUserDTO) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    if (email) {
      const isEmailRegistered = await this.repository.findByEmail(email);

      if (isEmailRegistered && isEmailRegistered.id !== id) {
        throw new ConflictException(`User with email ${email} already exists!`);
      }
    }

    return await this.repository.update(id, {
      name,
      email,
      password: password
        ? await HashService.hashPassword({ password })
        : user.password,
      role,
    });
  }

  async delete({ id }: DeleteUserDTO) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.repository.delete(id);
  }
}

export { UsersService };
