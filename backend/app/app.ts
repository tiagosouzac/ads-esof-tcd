import express from "express";
import cors from "cors";
import { Database } from "../config/database";
import { ExceptionHandler } from "./middlewares/exception-handler.middleware";
import { UserRoutes } from "./routes/user.routes";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
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
