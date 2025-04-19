import express from "express";
import { Server } from "./server";
import { ExceptionHandler } from "app/middlewares/exception-handler.middleware";
import { RouteNotFound } from "app/middlewares/route-not-found.middleware";
import { UserController } from "app/controllers/user.controller";
import { SessionController } from "app/controllers/session.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "app/middlewares/authorization.middleware";

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
    const userController = new UserController();
    const sessionController = new SessionController();

    const sessionRouter = express.Router();
    sessionRouter.post("/", sessionController.create);
    sessionRouter.delete("/", sessionController.delete);

    const userRouter = express.Router();

    userRouter.use(AuthenticationMiddleware.handle);

    userRouter.get(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager"),
      userController.list
    );

    userRouter.get(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager", "user"),
      userController.get
    );

    userRouter.post(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      userController.create
    );

    userRouter.put(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      userController.update
    );

    userRouter.delete(
      "/:id",
      AuthorizationMiddleware.hasRole("admin"),
      userController.delete
    );

    this.server.registerRoute("/sessions", sessionRouter);
    this.server.registerRoute("/users", userRouter);
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
