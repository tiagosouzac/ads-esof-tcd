import { Routes } from "app/routes/routes";
import { SessionController } from "app/controllers/session.controller";
import { AuthenticationMiddleware } from "app/middlewares/authentication.middleware";

class SessionRoutes extends Routes {
  private sessionController: SessionController;

  constructor() {
    super();
    this.sessionController = new SessionController();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.post("/", this.sessionController.create);

    this.delete(
      "/",
      AuthenticationMiddleware.handle,
      this.sessionController.delete
    );
  }
}

export { SessionRoutes };
