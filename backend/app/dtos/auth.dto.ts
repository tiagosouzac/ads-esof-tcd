import { UserDTO } from "./user.dto";
import { AuthValidator } from "../validators/auth.validator";

class AuthDTO {
  constructor(public readonly user: UserDTO, public readonly token: string) {}
}

type HandleLoginDTO = ReturnType<typeof AuthValidator.prototype.handle>;

export { AuthDTO, HandleLoginDTO };
