import { z } from "zod";
import { UnprocessableContentException } from "app/exceptions/unprocessable-content.exception";

class SessionValidator {
  private readonly schema = z.object({
    id: z.coerce.number(),
    email: z.string().email(),
    password: z.string().min(8),
    userId: z.coerce.number(),
    token: z.string(),
    expiresAt: z.coerce.date(),
  });

  create(data: unknown) {
    try {
      return this.schema.pick({ email: true, password: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid data provided for session creation.",
          error.format()
        );
      }

      throw error;
    }
  }

  delete(data: unknown) {
    try {
      return this.schema.pick({ token: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid session ID provided for deletion.",
          error.format()
        );
      }

      throw error;
    }
  }
}

export { SessionValidator };
