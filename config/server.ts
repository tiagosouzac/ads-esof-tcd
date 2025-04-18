import express, {
  type Express,
  RequestHandler,
  ErrorRequestHandler,
} from "express";

class Server {
  private server: Express;
  private port: number;

  constructor(port?: number) {
    this.server = express();
    this.port = port ?? 3000;
  }

  public setMiddleware(middleware: RequestHandler | ErrorRequestHandler) {
    this.server.use(middleware);
    return this;
  }

  public route(path: string, handler: RequestHandler) {
    this.server.use(path, handler);
    return this;
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}! 🚀`);
    });
  }
}

export { Server };
