import { UserDTO } from "./user.dto";
import { AuthValidator } from "../validators/auth.validator";
import { JwtDTO } from "./jwt.dto";

class AuthDTO {
  constructor(public readonly user: UserDTO, public readonly jwt: JwtDTO) {}
}

type HandleLoginDTO = ReturnType<typeof AuthValidator.prototype.handle>;

export { AuthDTO, HandleLoginDTO };
