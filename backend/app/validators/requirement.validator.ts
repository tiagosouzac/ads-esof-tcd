import { z } from "zod";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";

class RequirementValidator {
  private readonly schema = z.object({
    id: z.coerce.number().int().positive(),
    title: z.string().nonempty(),
    description: z.string().optional(),
    projectId: z.coerce.number(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
    isApproved: z
      .enum(["PENDING", "APPROVED", "DISAPPROVED"])
      .default("PENDING"),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

  list(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ projectId: true })
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
      .omit({ projectId: true, createdAt: true, updatedAt: true })
      .partial({ title: true, description: true, status: true })
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

  approve(payload: unknown) {
    const { success, data, error } = this.schema
      .pick({ id: true, isApproved: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }
}

export { RequirementValidator };
