import { Routes } from "app/routes/routes";
import { UserController } from "app/controllers/user.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "app/middlewares/authorization.middleware";

class UserRoutes extends Routes {
  private controller: UserController;

  constructor() {
    super();
    this.controller = new UserController();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.middleware(AuthenticationMiddleware.handle);

    this.get(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager"),
      this.controller.list
    );

    this.get(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager", "user"),
      this.controller.get
    );

    this.post(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      this.controller.create
    );

    this.put(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      this.controller.update
    );

    this.delete(
      "/:id",
      AuthorizationMiddleware.hasRole("admin"),
      this.controller.delete
    );
  }
}

export { UserRoutes };
