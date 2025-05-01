import { z } from "zod";

class Env {
  private static schema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
    SHADOW_DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRATION: z.coerce.number().default(3600),
  });

  private static env: z.infer<typeof this.schema>;

  static load() {
    return new Promise<void>((resolve, reject) => {
      try {
        process.loadEnvFile();
        this.validate();
        console.log("🌍 Environment variables loaded successfully!");
        resolve();
      } catch (error) {
        console.error("❌ Failed to load environment variables:", error);
        reject(error);
      }
    });
  }

  private static validate() {
    const result = this.schema.safeParse(process.env);

    if (!result.success) {
      console.error(
        "❌ Environment variables validation failed:",
        result.error.flatten().fieldErrors
      );

      throw new Error("Invalid environment variables");
    }

    this.env = result.data;
  }

  static get<Key extends keyof typeof this.env>(key: Key) {
    return this.env[key] satisfies (typeof this.env)[Key];
  }
}

export { Env };
