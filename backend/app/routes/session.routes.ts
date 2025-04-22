import { Routes } from "core/routes";
import { SessionController } from "app/controllers/session.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";

class SessionRoutes extends Routes {
  private readonly sessionController = new SessionController();

  protected registerRoutes(): void {
    this.post("/", (request, response) =>
      this.sessionController.create(request, response)
    );

    this.delete("/", AuthenticationMiddleware.handle, (request, response) =>
      this.sessionController.delete(request, response)
    );
  }
}

export { SessionRoutes };
