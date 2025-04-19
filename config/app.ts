import express from "express";
import { Server } from "config/server";
import { ExceptionHandler } from "app/middlewares/exception-handler.middleware";
import { RouteNotFound } from "app/middlewares/route-not-found.middleware";
import { UserRoutes } from "app/routes/user.routes";
import { SessionRoutes } from "app/routes/session.routes";

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
    const userRoutes = new UserRoutes();
    const sessionRoutes = new SessionRoutes();

    this.server.registerRoute("/users", userRoutes.getRouter());
    this.server.registerRoute("/sessions", sessionRoutes.getRouter());
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
