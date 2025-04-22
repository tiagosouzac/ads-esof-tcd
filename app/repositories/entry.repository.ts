import { Database } from "config/database";
import { Entry } from "app/models/entry.model";

class EntryRepository {
  constructor(private readonly db = new Database()) {}

  async findAll() {
    const query = "SELECT * FROM entries ORDER BY timestamp DESC";
    return await this.db.query(query);
  }

  async findById(id: number) {
    const query = "SELECT * FROM entries WHERE id = $1";
    const params = [id];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async findByUserId(userId: number) {
    const query =
      "SELECT * FROM entries WHERE user_id = $1 ORDER BY timestamp DESC";
    const params = [userId];
    return await this.db.query(query, params);
  }

  async findByUserIdAndDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
  ) {
    const query =
      "SELECT * FROM entries WHERE user_id = $1 AND timestamp BETWEEN $2 AND $3 ORDER BY timestamp ASC";
    const params = [userId, startDate, endDate];
    return await this.db.query(query, params);
  }

  async insert(entry: Entry) {
    const query =
      "INSERT INTO entries (user_id, timestamp, type) VALUES ($1, $2, $3) RETURNING *";
    const params = [entry.userId, entry.timestamp, entry.type];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async update(id: number, entry: Partial<Entry>) {
    const query =
      "UPDATE entries SET timestamp = $1, type = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *";
    const params = [entry.timestamp, entry.type, id];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async delete(id: number) {
    const query = "DELETE FROM entries WHERE id = $1";
    const params = [id];
    await this.db.query(query, params);
  }

  async getLastEntryForUser(userId: number) {
    const query =
      "SELECT * FROM entries WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1";
    const params = [userId];
    const result = await this.db.query(query, params);
    return result[0];
  }
}

export { EntryRepository };
