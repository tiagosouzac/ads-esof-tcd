import { Role } from "../../infra/database/prisma/generated/prisma";
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
import { SystemConfigService } from "./system-config.service";

class UsersService {
  private readonly repository = new UserRepository();
  private systemConfigService = new SystemConfigService();

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
    role = await this.assignAdminRoleForFirstUser(role);

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

  private async assignAdminRoleForFirstUser(role: string) {
    const config = await this.systemConfigService.find({
      key: "FIRST_ADMIN_CREATED",
    });

    const isFirstAdminCreated = (config?.value ?? "false") === "true";

    if (!isFirstAdminCreated) {
      role = "ADMIN";

      await this.systemConfigService.create({
        key: "FIRST_ADMIN_CREATED",
        value: "true",
      });
    }

    return role as Role;
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
