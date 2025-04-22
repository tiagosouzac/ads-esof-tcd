import { EntryService } from "app/services/entry.service";
import { EntryValidator } from "app/validators/entry.validator";
import { Controller } from "core/controller";
import { Request, Response } from "express";
import { AuthorizationService } from "app/services/authorization.service";

class EntryController extends Controller {
  private readonly validator = new EntryValidator();
  private readonly service = new EntryService();
  private readonly authService = new AuthorizationService();

  async list(request: Request, response: Response) {
    let entries;

    if (["admin", "manager", "hr"].includes(request.user!.role)) {
      const { userId } = request.query;
      entries = await this.service.list(userId ? Number(userId) : undefined);
    } else {
      entries = await this.service.list(request.user!.id);
    }

    response.json({
      entries: entries.map((entry) => ({
        id: entry.id,
        userId: entry.userId,
        timestamp: entry.timestamp,
        type: entry.type,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      })),
    });
  }

  async get(request: Request, response: Response) {
    const { id } = this.validator.get({ id: request.params.id });

    const entry = await this.service.get(id, request.user!.id!);

    this.authService.canAccessResource(request.user!, entry.userId);

    response.json({
      entry: {
        id: entry.id,
        userId: entry.userId,
        timestamp: entry.timestamp,
        type: entry.type,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      },
    });
  }

  async create(request: Request, response: Response) {
    const { type } = this.validator.create(request.body);
    const entry = await this.service.create(request.user!.id!, type);

    response.status(201).json({
      entry: {
        id: entry.id,
        userId: entry.userId,
        timestamp: entry.timestamp,
        type: entry.type,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      },
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = this.validator.get({ id: request.params.id });

    this.authService.hasRole(request.user!.role, ["admin"]);

    await this.service.delete(id, request.user!.id!);

    response.status(204).end();
  }
}

export { EntryController };
