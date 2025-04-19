import { Routes } from "core/routes";
import { UserController } from "app/controllers/user.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "app/middlewares/authorization.middleware";

class UserRoutes extends Routes {
  private readonly controller = new UserController();

  protected registerRoutes(): void {
    this.middleware(AuthenticationMiddleware.handle);

    this.get(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager"),
      (request, response) => this.controller.list(request, response)
    );

    this.get(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr", "manager", "user"),
      (request, response) => this.controller.get(request, response)
    );

    this.post(
      "/",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      (request, response) => this.controller.create(request, response)
    );

    this.put(
      "/:id",
      AuthorizationMiddleware.hasRole("admin", "hr"),
      (request, response) => this.controller.update(request, response)
    );

    this.delete(
      "/:id",
      AuthorizationMiddleware.hasRole("admin"),
      (request, response) => this.controller.delete(request, response)
    );
  }
}

export { UserRoutes };
