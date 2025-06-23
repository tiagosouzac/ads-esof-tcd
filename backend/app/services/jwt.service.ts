import jwt from "jsonwebtoken";
import { Env } from "../../config/env";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { GenerateJwtTokenDTO, VerifyJwtTokenDTO } from "../dtos/jwt.dto";

class JwtService {
  static generateToken({ id, name, email, role }: GenerateJwtTokenDTO) {
    const secret = Env.get("JWT_SECRET");
    const expiresIn = Env.get("JWT_EXPIRATION");

    const value = jwt.sign({ id, name, email, role }, secret, {
      expiresIn: expiresIn / 1000,
    });

    return { value, expiresIn };
  }

  static verifyToken({ token }: VerifyJwtTokenDTO) {
    const secret = Env.get("JWT_SECRET");

    try {
      const payload = jwt.verify(token, secret);

      if (typeof payload === "string") {
        throw new UnauthorizedException("Invalid token. Please log in again.");
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException(
        "Invalid or expired token. Please log in again."
      );
    }
  }
}

export { JwtService };
