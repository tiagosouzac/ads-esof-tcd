import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRoutes {
  private static readonly controller = new UserController();
  private static readonly routes = Router();
  private static readonly path = "/users";

  public static getPath(): string {
    return this.path;
  }

  public static getRoutes(): Router {
    return this.routes
      .get("/", this.controller.list.bind(this.controller))
      .get("/:id", this.controller.find.bind(this.controller))
      .post("/", this.controller.create.bind(this.controller))
      .put("/:id", this.controller.update.bind(this.controller))
      .delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export { UserRoutes };
