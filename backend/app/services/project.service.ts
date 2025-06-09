import {
  CreateProjectDTO,
  DeleteProjectDTO,
  FindProjectDTO,
  UpdateProjectDTO,
} from "../dtos/project.dto";
import { ConflictException } from "../exceptions/conflict.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ProjectRepository } from "../repositories/project.repository";

class ProjectService {
  private readonly repository = new ProjectRepository();

  async list() {
    return this.repository.list();
  }

  async find(payload: FindProjectDTO) {
    const project = await this.repository.findById(payload);

    if (!project) {
      throw new NotFoundException(`Project with id ${payload.id} not found!`);
    }

    return project;
  }

  async create(payload: CreateProjectDTO) {
    const projectWithSameName = await this.repository.findByName(payload.name);

    if (projectWithSameName) {
      throw new ConflictException(
        `Project with name "${payload.name}" already exists!`
      );
    }

    return await this.repository.create(payload);
  }

  async update(payload: UpdateProjectDTO) {
    const project = await this.repository.findById({ id: payload.id });

    if (!project) {
      throw new NotFoundException(`Project with id ${payload.id} not found!`);
    }

    if (payload.name) {
      const projectWithSameName = await this.repository.findByName(
        payload.name
      );

      if (projectWithSameName && projectWithSameName.id !== payload.id) {
        throw new ConflictException(
          `Project with name "${payload.name}" already exists!`
        );
      }
    }

    return await this.repository.update(payload);
  }

  async delete(payload: DeleteProjectDTO) {
    const project = await this.repository.findById(payload);

    if (!project) {
      throw new NotFoundException(`Project with id ${payload.id} not found!`);
    }

    return this.repository.delete(payload);
  }
}

export { ProjectService };
