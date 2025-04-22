import { ZodSchema } from "zod";

abstract class Validator {
  abstract readonly schema: ZodSchema;

  list?(data: unknown): unknown;
  get?(data: unknown): unknown;
  create?(data: unknown): unknown;
  update?(data: unknown): unknown;
  delete?(data: unknown): unknown;
}

export { Validator };
