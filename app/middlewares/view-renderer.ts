import { type Request, type Response, type NextFunction } from "express";
import { Views } from "config/views";

declare global {
  namespace Express {
    interface Response {
      render(view: string, data?: Record<string, any>): Promise<void>;
    }
  }
}

class ViewRenderer {
  static handle(viewsPath: string) {
    const views = new Views(viewsPath);

    return function (_: Request, response: Response, next: NextFunction) {
      response.render = async function (
        view: string,
        data: Record<string, any> = {}
      ) {
        try {
          const html = await views.render(view, data);
          response.type("html").send(html);
        } catch (error) {
          next(error);
        }
      };

      next();
    };
  }
}

export { ViewRenderer };
