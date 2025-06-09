import { Router } from "express";
import { PrototypeController } from "../controllers/prototype.controller";

class PrototypeRoutes {
  private static readonly controller = new PrototypeController();
  private static readonly routes = Router();
  private static readonly path = "/prototypes";

  public static getPath() {
    return this.path;
  }

  public static getRoutes() {
    return this.routes
      .get("/", this.controller.list.bind(this.controller))
      .get("/:id", this.controller.find.bind(this.controller))
      .post("/", this.controller.create.bind(this.controller))
      .put("/:id", this.controller.update.bind(this.controller))
      .delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export { PrototypeRoutes };
