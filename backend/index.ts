import { env } from "config/env";
import { App } from "config/app";

async function bootstrap() {
  try {
    new App(env.get("PORT")).start();
  } catch (error) {
    console.error("Failed to bootstrap the application:", error);
  }
}

bootstrap();
