import express, { type Express } from "express";
import { ExceptionHandler } from "app/middlewares/exception-handler";
import { RouteNotFound } from "app/middlewares/route-not-found";

class Server {
  private server: Express;
  private port: number;

  constructor(port?: number) {
    this.server = express();
    this.port = port ?? 3000;
    this.middlewares();
    this.routes();
    this.handleRouteNotFound();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.get("/", (req, res) => {
      res.send("Hello World!");
    });
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
