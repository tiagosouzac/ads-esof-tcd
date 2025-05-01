import express from "express";
import cors from "cors";
import { Database } from "../config/database";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  async init() {
    this.setupMiddlewares();
    this.setupRoutes();
    await this.setupDatabase();
  }

  setupMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.get("/", (_, response) => {
      response.send("Hello World!");
    });
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
