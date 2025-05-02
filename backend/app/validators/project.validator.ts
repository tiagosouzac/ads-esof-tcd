import { z } from "zod";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";

class ProjectValidator {
  private readonly schema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

  find(payload: unknown) {
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
      .partial({ name: true, description: true })
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

export { ProjectValidator };
