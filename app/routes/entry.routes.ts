import { Routes } from "core/routes";
import { EntryController } from "app/controllers/entry.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "app/middlewares/authorization.middleware";

class EntryRoutes extends Routes {
  private readonly controller = new EntryController();

  protected registerRoutes(): void {
    // Add authentication middleware for all entry routes
    this.middleware(AuthenticationMiddleware.handle);

    // List entries - different access levels handled in controller
    this.get("/", (request, response) =>
      this.controller.list(request, response)
    );

    // Get specific entry by ID
    this.get("/:id", (request, response) =>
      this.controller.get(request, response)
    );

    // Create new entry (clock in/out) - any authenticated user can do this
    this.post("/", (request, response) =>
      this.controller.create(request, response)
    );

    // Delete entry - only admin role can do this
    this.delete(
      "/:id",
      AuthorizationMiddleware.hasRole("admin"),
      (request, response) => this.controller.delete(request, response)
    );
  }
}

export { EntryRoutes };
