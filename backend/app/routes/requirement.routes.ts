import { Router } from "express";
import { RequirementController } from "../controllers/requirement.controller";

class RequirementRoutes {
  private static readonly controller = new RequirementController();
  private static readonly routes = Router();
  private static readonly path = "/requirements";

  static getPath() {
    return this.path;
  }

  static getRoutes() {
    return this.routes
      .get("/", this.controller.list.bind(this.controller))
      .get("/:id", this.controller.find.bind(this.controller))
      .post("/", this.controller.create.bind(this.controller))
      .put("/:id", this.controller.update.bind(this.controller))
      .patch("/:id/approve", this.controller.approve.bind(this.controller))
      .delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export { RequirementRoutes };
