import { env } from "config/env";
import { Server } from "config/server";
import { database } from "config/database";

// Import reflect-metadata for TypeORM decorators
import "reflect-metadata";

async function bootstrap() {
  try {
    await database.initialize();
    const server = new Server(env.get("PORT"));
    server.listen();
  } catch (error) {
    console.error("Failed to bootstrap the application:", error);
  }
}

bootstrap();
