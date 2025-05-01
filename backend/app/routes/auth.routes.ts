import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

class AuthRoutes {
  private static readonly controller = new AuthController();
  private static readonly routes = Router();
  private static readonly path = "/auth";

  public static getPath() {
    return this.path;
  }

  public static getRoutes() {
    return this.routes.post("/", this.controller.handle.bind(this.controller));
  }
}

export { AuthRoutes };
