import { NotFoundException } from "app/exceptions/not-found.exception";
import { User } from "app/models/user.model";
import { UserRepository } from "app/repositories/user.repository";
import { HashService } from "app/services/hash.service";

class UserService {
  constructor(
    private readonly repository = new UserRepository(),
    private readonly hashService = new HashService()
  ) {}

  async list(): Promise<User[]> {
    const users = await this.repository.findAll();
    return users.map((user) => this.mapToUserModel(user));
  }

  async get(id: number): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToUserModel(user);
  }

  async create(user: User): Promise<User> {
    await this.validateUniqueEmail(user.email);

    const hashedPassword = await this.hashService.hash(user.password);

    const userData = await this.repository.insert({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });

    return this.mapToUserModel(userData);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const existingUser = await this.repository.findById(id);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (userData.email && userData.email !== existingUser.email) {
      await this.validateUniqueEmail(userData.email);
    }

    const updateData = this.mapToUserModel({
      name: userData.name || existingUser.name,
      email: userData.email || existingUser.email,
      password: userData.password
        ? await this.hashService.hash(userData.password)
        : "",
      role: userData.role || existingUser.role,
    });

    const updatedUser = await this.repository.update(id, updateData);
    return this.mapToUserModel(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.repository.delete(id);
  }

  private async validateUniqueEmail(email: string): Promise<void> {
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new Error(`Email ${email} is already in use`);
    }
  }

  private mapToUserModel(userData: any): User {
    return new User(
      userData.name,
      userData.email,
      userData.password,
      userData.role || "user",
      userData.id,
      userData.created_at,
      userData.updated_at
    );
  }
}

export { UserService };
