import { Role } from "../../infra/database/prisma/generated/prisma";
import {
  CreateUserDTO,
  DeleteUserDTO,
  FindUserDTO,
  ListUserDTO,
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

  async list(payload: ListUserDTO) {
    return await this.repository.list(payload);
  }

  async find(payload: FindUserDTO) {
    const user = await this.repository.findById(payload);

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found!`);
    }

    return user;
  }

  async show(payload: ShowUserDTO) {
    const user = await this.repository.findById(payload);

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found!`);
    }

    return user;
  }

  async create(payload: CreateUserDTO) {
    payload.role = await this.assignAdminRoleForFirstUser(payload.role);

    const isEmailRegistered = await this.repository.findByEmail({
      email: payload.email,
    });

    if (isEmailRegistered) {
      throw new ConflictException(
        `User with email ${payload.email} already exists!`
      );
    }

    return await this.repository.create({
      ...payload,
      password: await HashService.hashPassword({ password: payload.password }),
    });
  }

  private async assignAdminRoleForFirstUser(role: string) {
    const config = await this.systemConfigService.find({
      key: "FIRST_MANAGER_CREATED",
    });

    const isFirstAdminCreated = (config?.value ?? "false") === "true";

    if (!isFirstAdminCreated) {
      role = "MANAGER";

      await this.systemConfigService.create({
        key: "FIRST_MANAGER_CREATED",
        value: "true",
      });
    }

    return role as Role;
  }

  async update(payload: UpdateUserDTO) {
    const user = await this.repository.findById({ id: payload.id });

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found!`);
    }

    if (payload.email) {
      const isEmailRegistered = await this.repository.findByEmail({
        email: payload.email,
      });

      if (isEmailRegistered && isEmailRegistered.id !== payload.id) {
        throw new ConflictException(
          `User with email ${payload.email} already exists!`
        );
      }
    }

    return await this.repository.update({
      ...payload,
      password: payload.password
        ? await HashService.hashPassword({ password: payload.password })
        : user.password,
    });
  }

  async delete(payload: DeleteUserDTO) {
    const user = await this.repository.findById(payload);

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found`);
    }

    await this.repository.delete(payload);
  }
}

export { UsersService };
