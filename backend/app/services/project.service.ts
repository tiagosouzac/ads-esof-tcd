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

  async find({ id }: FindProjectDTO) {
    const project = await this.repository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found!`);
    }

    return project;
  }

  async create({ name, description }: CreateProjectDTO) {
    const projectWithSameName = await this.repository.findByName(name);

    if (projectWithSameName) {
      throw new ConflictException(
        `Project with name "${name}" already exists!`
      );
    }

    return await this.repository.create({ name, description });
  }

  async update({ id, name, description }: UpdateProjectDTO) {
    const project = await this.repository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found!`);
    }

    if (name) {
      const projectWithSameName = await this.repository.findByName(name);

      if (projectWithSameName && projectWithSameName.id !== id) {
        throw new ConflictException(
          `Project with name "${name}" already exists!`
        );
      }
    }

    return await this.repository.update(id, { name, description });
  }

  async delete({ id }: DeleteProjectDTO) {
    const project = await this.repository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found!`);
    }

    return this.repository.delete(id);
  }
}

export { ProjectService };
