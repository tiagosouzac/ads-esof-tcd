import { z } from "zod";
import { UnprocessableContentException } from "app/exceptions/unprocessable-content.exception";
import { Validator } from "core/validator";

class EntryValidator extends Validator {
  readonly schema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    timestamp: z.coerce.date(),
    type: z.enum(["in", "out"]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  });

  list(data: unknown) {
    try {
      return this.schema.pick({ userId: true }).parse(data);
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

  get(data: unknown) {
    try {
      return this.schema.pick({ id: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid entry ID provided.",
          error.format()
        );
      }
      throw error;
    }
  }

  create(data: unknown) {
    try {
      return this.schema.pick({ type: true }).parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new UnprocessableContentException(
          "Validation failed: Invalid data provided for entry creation.",
          error.format()
        );
      }
      throw error;
    }
  }
}

export { EntryValidator };
