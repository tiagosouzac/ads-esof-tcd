import { env } from "config/env";
import { App } from "config/app";
import { database } from "config/database";

// Import reflect-metadata for TypeORM decorators
import "reflect-metadata";

async function bootstrap() {
  try {
    await database.initialize();
    new App(env.get("PORT")).start();
  } catch (error) {
    console.error("Failed to bootstrap the application:", error);
  }
}

bootstrap();
