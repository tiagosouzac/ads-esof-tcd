import { ForbiddenException } from "app/exceptions/forbidden.exception";
import { NotFoundException } from "app/exceptions/not-found.exception";
import { Entry } from "app/models/entry.model";
import { EntryRepository } from "app/repositories/entry.repository";

class EntryService {
  constructor(private readonly repository = new EntryRepository()) {}

  async list(userId?: number): Promise<Entry[]> {
    let entries;

    if (userId) {
      entries = await this.repository.findByUserId(userId);
    } else {
      entries = await this.repository.findAll();
    }

    return entries.map((entry) => this.mapToEntryModel(entry));
  }

  async get(id: number, authenticatedUserId: number): Promise<Entry> {
    const entry = await this.repository.findById(id);

    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    // Only allow users to see their own entries unless they have admin/manager roles (handled in controller)
    if (entry.user_id !== authenticatedUserId) {
      throw new ForbiddenException(
        "You cannot access entries that don't belong to you"
      );
    }

    return this.mapToEntryModel(entry);
  }

  async create(userId: number, type: "in" | "out"): Promise<Entry> {
    // Check the last entry for this user to validate the type sequence
    const lastEntry = await this.repository.getLastEntryForUser(userId);

    // If there's a previous entry and the type is the same as the requested one, throw an error
    if (lastEntry && lastEntry.type === type) {
      throw new ForbiddenException(
        `Cannot register ${type} entry. Your last register was already ${type}.`
      );
    }

    const entry = new Entry(userId, new Date(), type);
    const createdEntry = await this.repository.insert(entry);

    return this.mapToEntryModel(createdEntry);
  }

  async getByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Entry[]> {
    const entries = await this.repository.findByUserIdAndDateRange(
      userId,
      startDate,
      endDate
    );
    return entries.map((entry) => this.mapToEntryModel(entry));
  }

  async delete(id: number, authenticatedUserId: number): Promise<void> {
    const entry = await this.repository.findById(id);

    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    // Only allow users to delete their own entries unless they have admin/manager roles (handled in controller)
    if (entry.user_id !== authenticatedUserId) {
      throw new ForbiddenException(
        "You cannot delete entries that don't belong to you"
      );
    }

    await this.repository.delete(id);
  }

  private mapToEntryModel(entryData: any): Entry {
    return new Entry(
      entryData.user_id,
      entryData.timestamp,
      entryData.type,
      entryData.id,
      entryData.created_at,
      entryData.updated_at
    );
  }
}

export { EntryService };
