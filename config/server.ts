import express, { type Express } from "express";
import { ExceptionHandler } from "app/middlewares/exception-handler";
import { RouteNotFound } from "app/middlewares/route-not-found";
import { ViewRenderer } from "app/middlewares/view-renderer";
import path from "path";

class Server {
  private server: Express;
  private port: number;

  constructor(port?: number) {
    this.server = express();
    this.port = port ?? 3000;
    this.middlewares();
    this.configureViewRendering();
    this.routes();
    this.handleRouteNotFound();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.static(path.join(process.cwd(), "static")));
  }

  private configureViewRendering() {
    const viewsPath = path.join(process.cwd(), "app/views");
    this.server.use(ViewRenderer.handle(viewsPath));
  }

  private routes() {
    this.server.get("/", (_, response) => response.render("index"));
  }

  private handleRouteNotFound() {
    this.server.use(RouteNotFound.handle);
  }

  private exceptionHandler() {
    this.server.use(ExceptionHandler.handle);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}! 🚀`);
    });
  }
}

export { Server };
