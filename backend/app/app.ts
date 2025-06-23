import express from "express";
import cors from "cors";
import { Database } from "../config/database";
import { ExceptionHandler } from "./middlewares/exception-handler.middleware";
import { UserRoutes } from "./routes/user.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { ProjectRoutes } from "./routes/project.routes";
import { Auth } from "./middlewares/auth.middleware";
import { RequirementRoutes } from "./routes/requirement.routes";
import { TaskRoutes } from "./routes/task.routes";
import { PrototypeRoutes } from "./routes/prototype.routes";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  getApp() {
    return this.app;
  }

  async init() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupExceptionHandler();
    await this.setupDatabase();
  }

  setupMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.use(UserRoutes.getPath(), UserRoutes.getRoutes());
    this.app.use(AuthRoutes.getPath(), AuthRoutes.getRoutes());

    this.app.use(
      ProjectRoutes.getPath(),
      Auth.handle,
      ProjectRoutes.getRoutes()
    );

    this.app.use(
      RequirementRoutes.getPath(),
      Auth.handle,
      RequirementRoutes.getRoutes()
    );

    this.app.use(
      PrototypeRoutes.getPath(),
      Auth.handle,
      PrototypeRoutes.getRoutes()
    );

    this.app.use(TaskRoutes.getPath(), Auth.handle, TaskRoutes.getRoutes());
  }

  setupExceptionHandler() {
    this.app.use(ExceptionHandler.handle);
  }

  async setupDatabase() {
    await Database.connect();
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}!`);
    });
  }
}

export { App };
