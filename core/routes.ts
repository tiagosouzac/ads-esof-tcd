import { RequestHandler, Router } from "express";

abstract class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected middleware(middleware: RequestHandler) {
    this.router.use(middleware);
  }

  protected get(path: string, ...handlers: RequestHandler[]) {
    this.router.get(path, ...handlers);
  }

  protected post(path: string, ...handlers: RequestHandler[]) {
    this.router.post(path, handlers);
  }

  protected put(path: string, ...handlers: RequestHandler[]) {
    this.router.put(path, handlers);
  }

  protected delete(path: string, ...handlers: RequestHandler[]) {
    this.router.delete(path, handlers);
  }

  protected abstract registerRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }
}

export { Routes };
