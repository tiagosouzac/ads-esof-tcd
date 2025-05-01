import bcrypt from "bcrypt";
import { ComparePasswordDTO, HashPasswordDTO } from "../dtos/hash.dto";

class HashService {
  private static saltRounds = 10;

  public static hashPassword({ password }: HashPasswordDTO) {
    return bcrypt.hash(password, this.saltRounds);
  }

  public static async comparePassword({
    password,
    hashedPassword,
  }: ComparePasswordDTO) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export { HashService };
