import express from "express";
import path from "path";
import { Server } from "./server";
import { ExceptionHandler } from "app/middlewares/exception-handler";
import { RouteNotFound } from "app/middlewares/route-not-found";
import { ViewRenderer } from "app/middlewares/view-renderer";

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
    this.server.route("/", (_, response) => response.render("index"));
  }

  private setupMiddlewares() {
    this.server
      .setMiddleware(express.json())
      .setMiddleware(express.static(path.join(process.cwd(), "static")))
      .setMiddleware(
        ViewRenderer.handle(path.join(process.cwd(), "app/views"))
      );
  }

  private setupErrorHandling() {
    this.server
      .setMiddleware(RouteNotFound.handle)
      .setMiddleware(ExceptionHandler.handle);
  }
}

export { App };
