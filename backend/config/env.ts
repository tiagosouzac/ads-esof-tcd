import { config } from "dotenv";
import { z } from "zod";

class Env {
  private environmentVariables: Record<string, any> = {};

  private environmentVariablesSchema = z.object({
    ENVIRONMENT: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_HOST: z.string().default("localhost"),
    DATABASE_PORT: z.coerce.number().default(5432),
    DATABASE_NAME: z.string().default("local_db"),
    DATABASE_USERNAME: z.string().default("local_user"),
    DATABASE_PASSWORD: z.string().default("local_password"),
  });

  constructor() {
    this.load();
    this.validate();
  }

  private load() {
    config({ path: `.env.${process.env.ENVIRONMENT ?? "development"}` });
  }

  private validate() {
    const parsed = this.environmentVariablesSchema.safeParse(process.env);

    if (!parsed.success) {
      console.error(
        "Invalid environment variables:",
        parsed.error.flatten().fieldErrors
      );

      throw new Error("Invalid environment variables");
    }

    this.environmentVariables = parsed.data;
  }

  get(key: keyof z.infer<typeof this.environmentVariablesSchema>) {
    if (!(key in this.environmentVariables)) {
      throw new Error(`Environment variable ${key} not found`);
    }

    return this.environmentVariables[key];
  }
}

const env = new Env();

export { env };
