import { z } from "zod";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";

class UserValidator {
  private readonly schema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1).max(255),
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
    role: z.enum([
      "MANAGER",
      "ARCHITECT",
      "DESIGNER",
      "DEVELOPER",
      "QUALITY_ANALYST",
    ]),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

  list(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ role: true })
      .partial()
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  find(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ id: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  show(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ id: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  create(payload: unknown) {
    const { success, data, error } = this.schema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  update(payload: unknown) {
    const { success, data, error } = this.schema
      .omit({ createdAt: true, updatedAt: true })
      .partial({ email: true, password: true, role: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  delete(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ id: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }
}

export { UserValidator };
