import { Request, Response } from "express";

abstract class Controller {
  constructor() {
    this.list = this.list?.bind(this);
    this.get = this.get?.bind(this);
    this.create = this.create?.bind(this);
    this.update = this.update?.bind(this);
    this.delete = this.delete?.bind(this);
  }

  list?(request: Request, response: Response): Promise<void>;
  get?(request: Request, response: Response): Promise<void>;
  create?(request: Request, response: Response): Promise<void>;
  update?(request: Request, response: Response): Promise<void>;
  delete?(request: Request, response: Response): Promise<void>;
}

export { Controller };
