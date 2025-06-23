import { z } from "zod";
import { UnprocessableContentException } from "../exceptions/unprocessable-content.exception";

class TaskValidator {
  private readonly schema = z.object({
    id: z.coerce.number().int().positive(),
    title: z.string().nonempty(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
    projectId: z.coerce.number().int().positive(),
    assigneeId: z.number().nullable(),
    isApproved: z
      .enum(["PENDING", "APPROVED", "DISAPPROVED"])
      .default("PENDING"),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  });

  list(payload: unknown) {
    const { success, error, data } = this.schema
      .pick({ projectId: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  find(payload: unknown) {
    const { success, error, data } = this.schema
      .pick({ id: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  create(payload: unknown) {
    const { success, error, data } = this.schema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  update(payload: unknown) {
    const { success, error, data } = this.schema
      .omit({ projectId: true, createdAt: true, updatedAt: true })
      .partial({
        title: true,
        description: true,
        status: true,
        assigneeId: true,
      })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  delete(payload: unknown) {
    const { success, error, data } = this.schema
      .pick({ id: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }

  approve(payload: unknown) {
    const { success, error, data } = this.schema
      .pick({ id: true, isApproved: true })
      .safeParse(payload);

    if (!success) {
      throw new UnprocessableContentException(error.flatten().fieldErrors);
    }

    return data;
  }
}

export { TaskValidator };
