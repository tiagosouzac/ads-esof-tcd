import { z } from "zod";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";

class AuthValidator {
  private readonly schema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
  });

  handle(payload: unknown) {
    const { success, data, error } = this.schema.safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }
}

export { AuthValidator };
