import express, { type Express } from "express";

class Server {
  private server: Express;
  private port: number;

  constructor(port?: number) {
    this.server = express();
    this.port = port ?? 3000;
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}! 🚀`);
    });
  }
}

export { Server };
