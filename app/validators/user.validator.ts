import { z } from "zod";
import { UnprocessableContentException } from "app/exceptions/unprocessable-content.exception";
import { Validator } from "core/validator";

class UserValidator extends Validator {
  readonly schema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["admin", "manager", "hr", "user"]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  });

  get(data: unknown) {
    try {
      return this.schema.pick({ id: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid user ID provided.",
          error.format()
        );
      }

      throw error;
    }
  }

  create(data: unknown) {
    try {
      return this.schema
        .omit({ id: true, createdAt: true, updatedAt: true })
        .parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid data provided for user creation.",
          error.format()
        );
      }

      throw error;
    }
  }

  update(data: unknown) {
    try {
      return this.schema
        .omit({ createdAt: true, updatedAt: true })
        .partial()
        .required({ id: true })
        .parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid data provided for user update.",
          error.format()
        );
      }

      throw error;
    }
  }

  delete(data: unknown) {
    try {
      return this.schema.pick({ id: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid user ID provided for deletion.",
          error.format()
        );
      }

      throw error;
    }
  }
}

export { UserValidator };
