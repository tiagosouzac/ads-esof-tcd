import { Edge } from "edge.js";

class Views {
  edge = new Edge();

  constructor(path: string) {
    this.edge.mount(path);
  }

  async render(template: string, data: Record<string, any> = {}) {
    return await this.edge.render(template, data);
  }
}

export { Views };
