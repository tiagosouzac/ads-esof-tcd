import { HandleLoginDTO } from "../dtos/auth.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { UserRepository } from "../repositories/user.repository";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";

class AuthService {
  private readonly userRepository = new UserRepository();

  async login(payload: HandleLoginDTO) {
    const user = await this.userRepository.findByEmail({
      email: payload.email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${payload.email} not found!`
      );
    }

    const isPasswordValid = await HashService.comparePassword({
      password: payload.password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const token = JwtService.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }
}

export { AuthService };
