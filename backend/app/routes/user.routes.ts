import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Auth } from "../middlewares/auth.middleware";

class UserRoutes {
  private static readonly controller = new UserController();
  private static readonly routes = Router();
  private static readonly path = "/users";

  public static getPath() {
    return this.path;
  }

  public static getRoutes() {
    return this.routes
      .post("/", this.controller.create.bind(this.controller))
      .use(Auth.handle)
      .get("/", this.controller.list.bind(this.controller))
      .get("/me", this.controller.show.bind(this.controller))
      .get("/:id", this.controller.find.bind(this.controller))
      .put("/:id", this.controller.update.bind(this.controller))
      .delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export { UserRoutes };
