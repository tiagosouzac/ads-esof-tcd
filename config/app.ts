import express from "express";
import { Server } from "./server";
import { ExceptionHandler } from "app/middlewares/exception-handler.middleware";
import { RouteNotFound } from "app/middlewares/route-not-found.middleware";

class App {
  private server: Server;

  constructor(port?: number) {
    this.server = new Server(port);
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  public start() {
    this.server.listen();
  }

  private setupRoutes() {
    const router = express.Router();

    router.get("/", (_, response) => {
      return response.render("index");
    });

    this.server.registerRoute("/", router);
  }

  private setupMiddlewares() {
    this.server
      .setMiddleware(express.json())
      .setMiddleware(express.urlencoded({ extended: true }));
  }

  private setupErrorHandling() {
    this.server
      .setMiddleware(RouteNotFound.handle)
      .setMiddleware(ExceptionHandler.handle);
  }
}

export { App };
